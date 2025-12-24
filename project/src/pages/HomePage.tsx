import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, BarChart, MessageCircle, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16 min-h-screen bg-nutrify-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 bg-nutrify-light dark:bg-gray-900">
        <div className="nutrify-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-6">
                {t('Your AI-Powered')}
                <br />
                <span className="text-nutrify-accent">
                  {t('Nutrition Assistant')}
                </span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                {t(
                  'Take a photo of your food and instantly get detailed nutritional information powered by advanced AI. Track your diet, make healthier choices, and achieve your nutrition goals.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="nutrify-btn-primary text-center py-3 px-8 text-lg"
                >
                  {t('Get Started Free')}
                </Link>
                <Link
                  to="/about"
                  className="nutrify-btn-outline text-center py-3 px-8 text-lg"
                >
                  {t('Learn More')}
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt={t('Fresh healthy food')}
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="nutrify-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('Our Technology')}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {t(
                'Our AI-powered platform makes nutrition tracking simple, accurate, and accessible for everyone.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Camera}
              title={t('Snap & Analyze')}
              description={t(
                'Take a photo of your meal and our AI identifies food items and portion sizes.'
              )}
            />
            <FeatureCard
              icon={BarChart}
              title={t('Track Progress')}
              description={t(
                'Monitor your nutrition intake with detailed charts and personalized insights.'
              )}
            />
            <FeatureCard
              icon={MessageCircle}
              title={t('Nutrition Chat')}
              description={t(
                'Ask questions and get personalized nutrition advice from our AI assistant.'
              )}
            />
            <FeatureCard
              icon={Calculator}
              title={t('Health Tools')}
              description={t(
                'Calculate BMI, estimate calories, and plan meals with our integrated tools.'
              )}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-nutrify-secondary dark:bg-gray-700">
        <div className="nutrify-container">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {t('Join Nutrify Today!')}
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              {t(
                'Join thousands of users who are making healthier choices with Nutrify\'s AI-powered nutrition analysis.'
              )}
            </p>
            <Link
              to="/register"
              className="nutrify-btn-primary text-center py-3 px-8 text-lg inline-block"
            >
              {t('Sign Up for Free')}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="nutrify-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('What Our Users Say')}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {t(
                'Nutrify is helping people achieve their health goals through accurate nutrition tracking.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote={t(
                'Nutrify has completely changed how I track my nutrition. No more guessing or manual logging - just take a photo and get all the details.'
              )}
              author="Sarah K."
              role={t('Fitness Enthusiast')}
              image="https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TestimonialCard
              quote={t(
                'As a nutritionist, I recommend Nutrify to all my clients. It\'s accurate, easy to use, and helps people stay accountable to their nutrition goals.'
              )}
              author="Dr. Michael L."
              role={t('Nutritionist')}
              image="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TestimonialCard
              quote={t(
                'The nutrition chatbot is like having a personal dietitian. I can ask questions anytime and get expert advice instantly.'
              )}
              author="James T."
              role={t('Weight Loss Journey')}
              image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-nutrify-light rounded-xl p-6 transition-all hover:shadow-md">
      <div className="bg-nutrify-secondary inline-flex p-3 rounded-full mb-4">
        <Icon size={24} className="text-nutrify-accent" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, image }) => {
  return (
    <div className="bg-nutrify-light rounded-xl p-6 shadow-sm">
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={author}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{author}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;