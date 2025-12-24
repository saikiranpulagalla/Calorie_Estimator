import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNutritionStore } from '../stores/nutritionStore';
import { Upload, Camera, X } from 'lucide-react';
import { analyzeFood } from '../services/foodAnalysisService';
import FoodAnalysisResults from '../components/analysis/FoodAnalysisResults';

const FoodAnalysisPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null); // preview URL
  const [imageFile, setImageFile] = useState<File | null>(null); // actual file
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [countdown, setCountdown] = useState<number | null>(null);
  const { setRecentAnalysis } = useNutritionStore();
  const cameraInputRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPEG, PNG, etc.)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file);
    }
  }, []);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setError('Could not access camera.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleModeToggle = () => {
    setMode(m => (m === 'upload' ? 'camera' : 'upload'));
    setError(null);
    setImage(null);
    setImageFile(null);
    setRecentAnalysis(null);
    setCountdown(null);
    if (mode === 'upload') startCamera();
    else stopCamera();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setImageFile(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const handleClearImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
    setImageFile(null);
    setRecentAnalysis(null);
  };

  const handleTakePhoto = async () => {
    setCountdown(5);
    let count = 5;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        capturePhoto();
        setCountdown(null);
      }
    }, 1000);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      // Calculate resize dimensions
      const maxDim = 800;
      let { videoWidth: w, videoHeight: h } = video;
      let nw = w, nh = h;
      if (w > h && w > maxDim) {
        nw = maxDim;
        nh = Math.round((h / w) * maxDim);
      } else if (h > w && h > maxDim) {
        nh = maxDim;
        nw = Math.round((w / h) * maxDim);
      } else if (w === h && w > maxDim) {
        nw = nh = maxDim;
      }
      const canvas = canvasRef.current;
      canvas.width = nw;
      canvas.height = nh;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, nw, nh);
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setImageFile(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  React.useEffect(() => {
    if (mode === 'camera') startCamera();
    else stopCamera();
    return () => stopCamera();
    // eslint-disable-next-line
  }, [mode]);

  const handleAnalyzeImage = async () => {
    if (!imageFile) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // In a real app, this would upload the image to your backend
      const analysisResults = await analyzeFood(imageFile);
      setRecentAnalysis(analysisResults);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Food Analysis</h1>
        <p className="text-gray-600">
          Upload a photo of your food to get detailed nutritional information
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Image Upload */}
        <div className="lg:col-span-2">
          <div className="nutrify-card mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Upload Food Image
            </h2>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                className={`nutrify-btn-primary flex items-center gap-2 border-2 transition-colors
                  ${mode === 'upload'
                    ? 'bg-nutrify-accent text-white border-nutrify-accent'
                    : 'bg-white text-nutrify-accent border-nutrify-accent hover:bg-nutrify-light'}
                `}
                onClick={() => mode !== 'upload' && handleModeToggle()}
                disabled={mode === 'upload'}
                tabIndex={mode === 'upload' ? 0 : -1}
                aria-disabled={mode === 'upload'}
              >
                <Upload size={18} className="text-inherit" /> Upload
              </button>
              <button
                type="button"
                className={`nutrify-btn-primary flex items-center gap-2 border-2 transition-colors
                  ${mode === 'camera'
                    ? 'bg-nutrify-accent text-white border-nutrify-accent'
                    : 'bg-white text-nutrify-accent border-nutrify-accent hover:bg-nutrify-light'}
                `}
                onClick={() => mode !== 'camera' && handleModeToggle()}
                disabled={mode === 'camera'}
                tabIndex={mode === 'camera' ? 0 : -1}
                aria-disabled={mode === 'camera'}
              >
                <Camera size={18} className="text-inherit" /> Camera
              </button>
            </div>

            {image ? (
              <div className="mt-6 flex flex-col items-center">
                <img
                  src={image}
                  alt="Food preview"
                  className="rounded-lg max-h-64 object-contain border mb-2"
                  style={{ background: '#fff' }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (image) URL.revokeObjectURL(image);
                      setImage(null);
                      setImageFile(null);
                      setRecentAnalysis(null);
                      if (mode === 'camera') startCamera();
                    }}
                    className="nutrify-btn-outline"
                    type="button"
                  >
                    Remove
                  </button>
                  <button
                    onClick={handleAnalyzeImage}
                    disabled={isAnalyzing}
                    className="nutrify-btn-primary flex items-center gap-2"
                    type="button"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera size={20} className="mr-2" />
                        Analyze Food
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              mode === 'upload' ? (
                <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-nutrify-accent bg-nutrify-light' : 'border-gray-300 hover:border-nutrify-accent hover:bg-nutrify-light'}`}>
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <Upload size={48} className={`mb-4 ${isDragActive ? 'text-nutrify-accent' : 'text-gray-400'}`} />
                    {isDragActive ? (
                      <p className="text-nutrify-accent font-medium">Drop your image here...</p>
                    ) : (
                      <>
                        <p className="font-medium text-gray-700 mb-2">Drag & drop a food image</p>
                        <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                        <p className="text-xs text-gray-500">Supports JPEG, PNG (max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <video ref={videoRef} className="rounded-lg w-full max-w-xs mb-2" autoPlay playsInline muted />
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                  <button type="button" className="nutrify-btn-primary w-full mb-2" onClick={handleTakePhoto} disabled={!!countdown}>
                    {countdown ? `Taking photo in ${countdown}s...` : 'Take Photo'}
                  </button>
                </div>
              )
            )}
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
          
          <div className="nutrify-card bg-nutrify-light">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Tips for Best Results</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="bg-nutrify-secondary text-sm font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
                Take photos in good lighting
              </li>
              <li className="flex items-start">
                <span className="bg-nutrify-secondary text-sm font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
                Include all food items in the frame
              </li>
              <li className="flex items-start">
                <span className="bg-nutrify-secondary text-sm font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
                Take photos from above for best recognition
              </li>
              <li className="flex items-start">
                <span className="bg-nutrify-secondary text-sm font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">4</span>
                Include common objects for scale (e.g., utensils)
              </li>
            </ul>
          </div>
        </div>
        
        {/* Right Column - Analysis Results */}
        <div className="lg:col-span-3">
          <FoodAnalysisResults isLoading={isAnalyzing} />
        </div>
      </div>
    </div>
  );
};

export default FoodAnalysisPage;