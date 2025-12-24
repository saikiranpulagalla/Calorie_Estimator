import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Database, Lock, BarChart2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-nutrify-light">
        <div className="nutrify-container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {t('About Nutrify')}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {t("We're on a mission to make nutrition tracking effortless and accessible for everyone through cutting-edge AI technology.")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="nutrify-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t('Our Mission')}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('At Nutrify, we believe that understanding what you eat is the foundation of a healthy lifestyle. Yet traditional methods of tracking nutrition are tedious, inaccurate, and difficult to maintain.')}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {t("That's why we've built an AI-powered platform that makes nutrition tracking as simple as taking a photo. By combining cutting-edge computer vision with comprehensive nutritional databases, we provide accurate, instant insights into your food.")}
              </p>
              <p className="text-lg text-gray-700">
                {t('Our goal is to empower individuals to make informed dietary choices, support health professionals with reliable data, and ultimately contribute to healthier communities worldwide.')}
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Fresh vegetables and fruits"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-nutrify-light">
        <div className="nutrify-container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('Our Technology')}
            </h2>
            <p className="text-lg text-gray-700">
              {t('Nutrify leverages advanced AI to transform food photos into detailed nutritional insights.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TechCard
              icon={Brain}
              title={t('Convolutional Neural Networks')}
              description={t('Our AI uses deep learning models trained on millions of food images to identify dishes with high accuracy.')}
            />
            <TechCard
              icon={Database}
              title={t('Comprehensive Nutrient Database')}
              description={t('We map identified foods to an extensive database with detailed macro and micronutrient information.')}
            />
            <TechCard
              icon={BarChart2}
              title={t('Portion Size Estimation')}
              description={t('Advanced computer vision techniques estimate portion sizes from photos for accurate nutritional calculations.')}
            />
            <TechCard
              icon={Lock}
              title={t('Secure Data Processing')}
              description={t('All user data is processed securely with state-of-the-art encryption and privacy protections.')}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="nutrify-container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('Our Team')}
            </h2>
            <p className="text-lg text-gray-700">
              {t('Nutrify was created by a passionate team of nutrition experts, AI engineers, and health advocates.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember
              name="Dr. Emma Wilson"
              role="Chief Nutrition Scientist"
              bio="PhD in Nutritional Sciences with 15+ years of experience in dietary research and clinical nutrition."
              image="https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TeamMember
              name="Alex Chen"
              role="AI Research Lead"
              bio="Computer vision specialist with expertise in deep learning and a passion for applying AI to solve real-world problems."
              image="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TeamMember
              name="Sophia Martinez"
              role="Product Director"
              bio="Former dietitian with a background in product management, focused on creating intuitive user experiences."
              image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-nutrify-secondary">
        <div className="nutrify-container">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {t('Start Your Nutrition Journey Today')}
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              {t('Join Nutrify and discover how easy tracking your nutrition can be with our AI-powered platform.')}
            </p>
            <Link
              to="/register"
              className="nutrify-btn-primary text-center py-3 px-8 text-lg inline-block"
            >
              {t('Sign Up Free')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface TechCardProps {
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

const TechCard: React.FC<TechCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
      <div className="bg-nutrify-secondary inline-flex p-3 rounded-full mb-4">
        <Icon size={24} className="text-nutrify-accent" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image }) => {
  return (
    <div className="bg-nutrify-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{name}</h3>
        <p className="text-nutrify-accent font-medium mb-3">{role}</p>
        <p className="text-gray-700">{bio}</p>
      </div>
    </div>
  );
};

export default AboutPage;