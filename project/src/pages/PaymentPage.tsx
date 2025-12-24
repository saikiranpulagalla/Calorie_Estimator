import React, { useState } from 'react';

const paymentMethods = [
  { key: 'card', label: 'Credit/Debit Card' },
  { key: 'bank', label: 'Online Banking' },
  { key: 'upi', label: 'UPI' },
];

const plans = [
  { key: 'monthly', label: 'Monthly', price: 499, color: 'bg-blue-500', desc: '₹499/month' },
  { key: 'yearly', label: 'Yearly (Save 20%)', price: 4790, color: 'bg-blue-700', desc: '₹4790/year (₹399/mo)' },
];

const PaymentPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [googleEmail, setGoogleEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGoogleSignIn = () => {
    // Simulate Google sign-in
    setGoogleEmail('user@gmail.com');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      alert('Payment successful! Welcome to Pro.');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="w-full max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Complete Your Payment</h1>
        <p className="text-blue-600 mb-8 text-center">
          Securely upgrade to Pro and unlock all features!
        </p>

        {/* Google Account */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-blue-700 mb-2">Google Account</label>
          {googleEmail ? (
            <div className="flex items-center space-x-2">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{googleEmail}</span>
              <button
                type="button"
                className="text-xs text-blue-600 underline"
                onClick={() => setGoogleEmail('')}
              >
                Change
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all shadow-sm"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
          )}
        </div>

        {/* Plan Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-blue-700 mb-2">Choose Plan</label>
          <div className="flex gap-4">
            {plans.map(plan => (
              <button
                key={plan.key}
                type="button"
                onClick={() => setSelectedPlan(plan.key as 'monthly' | 'yearly')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all font-semibold text-blue-900 ${
                  selectedPlan === plan.key
                    ? 'border-blue-600 bg-blue-100 shadow'
                    : 'border-gray-200 bg-white hover:border-blue-400'
                }`}
              >
                <div className="mb-1">{plan.label}</div>
                <div className="text-lg font-bold">{plan.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <form onSubmit={handlePayment}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-blue-700 mb-2">Payment Method</label>
            <div className="flex gap-4">
              {paymentMethods.map(method => (
                <label
                  key={method.key}
                  className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMethod === method.key
                      ? 'border-blue-600 bg-blue-100'
                      : 'border-gray-200 bg-white hover:border-blue-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.key}
                    checked={selectedMethod === method.key}
                    onChange={() => setSelectedMethod(method.key)}
                    className="mr-2"
                  />
                  {method.label}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!googleEmail || isProcessing}
            className={`w-full py-3 rounded-lg font-bold text-white text-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 border-2 border-blue-400 hover:scale-105 transition-transform duration-200 ${
              (!googleEmail || isProcessing) && 'opacity-60 cursor-not-allowed'
            }`}
          >
            {isProcessing
              ? 'Processing...'
              : `Pay ${selectedPlan === 'monthly' ? '₹499/month' : '₹4790/year'}`
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;