import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import { Edit2, Save, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuthStore();
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
    gender: user?.gender || '',
    weight: user?.weight || '',
    height: user?.height || '',
    calorieGoal: user?.calorieGoal || 2000,
  });
  const [selectedPlan, setSelectedPlan] = useState('fitness');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isProfileIncomplete = !formData.age || !formData.gender || !formData.weight || !formData.height;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile = {
      ...formData,
      age: formData.age ? parseInt(formData.age.toString()) : undefined,
      weight: formData.weight ? parseFloat(formData.weight.toString()) : undefined,
      height: formData.height ? parseFloat(formData.height.toString()) : undefined,
      calorieGoal: formData.calorieGoal ? parseInt(formData.calorieGoal.toString()) : 2000,
    };
    updateProfile(updatedProfile);
    // Persist to Firestore
    if (user?.id) {
      await setDoc(doc(db, 'users', user.id), {
        name: updatedProfile.name,
        email: updatedProfile.email,
        age: updatedProfile.age,
        gender: updatedProfile.gender,
        weight: updatedProfile.weight,
        height: updatedProfile.height,
        calorieGoal: updatedProfile.calorieGoal,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-nutrify-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="nutrify-card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Personal Information')}</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="nutrify-btn-outline flex items-center"
            >
              <Edit2 size={16} className="mr-1" />
              {t('Edit Profile')}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              {t('Cancel')}
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Full Name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Email Address')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={true}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Age')}
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Gender')}
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">{t('Select gender')}</option>
                <option value="male">{t('Male')}</option>
                <option value="female">{t('Female')}</option>
                <option value="other">{t('Other')}</option>
                <option value="prefer-not-to-say">{t('Prefer not to say')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Weight (kg)')}
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Height (cm)')}
              </label>
              <input
                id="height"
                name="height"
                type="number"
                step="0.1"
                value={formData.height}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="calorieGoal" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Daily Calorie Goal')}
              </label>
              <input
                id="calorieGoal"
                name="calorieGoal"
                type="number"
                step="50"
                value={formData.calorieGoal}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
          {isEditing && (
            <button
              type="submit"
              className="nutrify-btn-primary flex items-center"
            >
              <Save size={16} className="mr-1" />
              {t('Save Changes')}
            </button>
          )}
        </form>
      </div>

      {/* Plans Card */}
      <div className="nutrify-card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('Your Plan')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: 'fitness',
              title: t('General Fitness'),
              description: t('Balanced macros for overall health and energy.'),
            },
            {
              key: 'weight_loss',
              title: t('Weight Loss'),
              description: t('Lower calories, moderate protein, and reduced carbs.'),
            },
            {
              key: 'weight_gain',
              title: t('Weight Gain'),
              description: t('Higher calories with balanced protein and carbs.'),
            },
            {
              key: 'muscle_building',
              title: t('Muscle Building'),
              description: t('High protein, moderate carbs, and healthy fats.'),
            },
          ].map((plan) => (
            <button
              key={plan.key}
              type="button"
              onClick={() => setSelectedPlan(plan.key)}
              className={`w-full text-left p-4 rounded-lg border transition-all
                ${selectedPlan === plan.key
                  ? 'border-nutrify-accent bg-nutrify-light shadow-md'
                  : 'border-gray-200 bg-white hover:border-nutrify-accent'}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900 dark:text-gray-100">{plan.title}</span>
                {selectedPlan === plan.key && (
                  <span className="text-xs bg-nutrify-accent text-white px-2 py-1 rounded-full ml-2">
                    {t('Current Plan')}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="nutrify-card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('Preferences')}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{t('Email Notifications')}</h3>
              <p className="text-sm text-gray-600">{t('Receive updates and reminders')}</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-nutrify-secondary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nutrify-accent"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{t('Dark Mode')}</h3>
              <p className="text-sm text-gray-600">{t('Use dark theme')}</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-nutrify-secondary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nutrify-accent"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;