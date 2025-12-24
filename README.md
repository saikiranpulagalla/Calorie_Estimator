# Nutrify - AI-Powered Nutrition & Calorie Estimation Platform

A modern, full-featured web application for tracking nutritional intake, analyzing food, calculating BMI, and getting personalized nutrition insights powered by AI.

## 🌟 Features

### Core Functionality
- **Food Analysis**: Upload food images and analyze nutritional content using Google Generative AI
- **Meal Logging**: Track daily meals and maintain a comprehensive food diary
- **Nutrition Dashboard**: Visual charts and statistics for nutritional intake
- **AI Chatbot**: Get personalized nutrition advice and answers to health questions
- **BMI Calculator**: Calculate Body Mass Index with health recommendations
- **Calorie Estimator**: Estimate daily calorie requirements based on personal metrics

### User Features
- **Authentication**: Secure user registration and login with Firebase
- **User Profile**: Manage personal information and dietary preferences
- **Subscription System**: Premium features with payment integration
- **Multi-language Support**: Internationalization (i18n) for global users
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18.3**: UI library for building interactive interfaces
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and dev server
- **React Router v6**: Client-side routing

### State Management & Forms
- **Zustand**: Lightweight state management
- **React Hook Form**: Efficient form handling

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Chart.js & react-chartjs-2**: Data visualization

### Backend & Services
- **Firebase**: Authentication, database, and hosting
- **Google Generative AI**: Food analysis and chatbot capabilities
- **Axios**: HTTP client for API requests

### Development
- **ESLint**: Code quality and linting
- **TypeScript ESLint**: Type-aware linting

## 📁 Project Structure

```
Calorie_Estimator/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── analysis/        # Food analysis components
│   │   ├── chatbot/         # Chat interface components
│   │   ├── dashboard/       # Dashboard widgets
│   │   ├── meallog/         # Meal logging components
│   │   ├── navigation/      # Navigation bars and footers
│   │   └── tools/           # BMI & Calorie calculators
│   ├── pages/               # Page components (routes)
│   │   ├── HomePage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── FoodAnalysisPage.tsx
│   │   ├── MealLogPage.tsx
│   │   ├── ChatbotPage.tsx
│   │   ├── ToolsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SubscriptionPage.tsx
│   │   ├── PaymentPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── AboutPage.tsx
│   ├── layouts/             # Layout wrappers
│   │   ├── MainLayout.tsx   # Main app layout
│   │   └── AuthLayout.tsx   # Auth pages layout
│   ├── services/            # API & business logic
│   │   ├── authService.ts   # Firebase auth
│   │   ├── chatbotService.ts # AI chatbot
│   │   └── foodAnalysisService.ts # Food analysis
│   ├── stores/              # Zustand stores
│   │   ├── authStore.ts     # Authentication state
│   │   ├── chatbotStore.ts  # Chat state
│   │   ├── nutritionStore.ts # Nutrition data
│   │   └── themeStore.ts    # Theme state
│   ├── App.tsx              # Main app component
│   ├── firebase.ts          # Firebase configuration
│   ├── i18n.ts              # Internationalization setup
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── eslint.config.js         # ESLint configuration

firebase.json               # Firebase project config
firestore.indexes.json      # Firestore indexes
firestore.rules             # Firestore security rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Firebase project with Generative AI API access
- Google Generative AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saikiranpulagalla/Calorie_Estimator.git
   cd Calorie_Estimator
   ```

2. **Install dependencies**
   ```bash
   cd project
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `project/` directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_GOOGLE_GENERATIVE_AI_KEY=your_google_generative_ai_key
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📚 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🔐 Authentication & Security

- **Firebase Authentication**: Secure user authentication with email/password
- **Protected Routes**: Authenticated users can access protected pages
- **Firestore Rules**: Database-level security rules (`firestore.rules`)
- **User Sessions**: Persistent user sessions via Firebase

## 💾 Database

- **Firestore**: NoSQL database for storing:
  - User profiles
  - Meal logs
  - Nutrition data
  - Chat history

## 🤖 AI Features

### Food Analysis
- Upload food images
- Automatic nutritional analysis using Google Generative AI
- Calorie and macro nutrient estimation

### Chatbot
- AI-powered nutrition advice
- Personalized health recommendations
- Real-time conversation support

## 🎨 Customization

### Theme Customization
- Toggle dark/light mode via theme store
- Edit `tailwind.config.js` for color schemes
- Customize theme colors in `themeStore.ts`

### Adding New Features
1. Create component in appropriate folder under `components/`
2. Create page in `pages/` if needed
3. Add state management in `stores/` if required
4. Update routing in `App.tsx`
5. Add services if external API calls needed

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints for responsive layouts
- Touch-friendly interface

## 🌍 Internationalization

Multi-language support configured in `i18n.ts`
- Easy language switching
- Localized content and messages

## 🔧 Development Workflow

1. **Code Quality**: ESLint enforces consistent code style
2. **Type Safety**: TypeScript ensures type correctness
3. **Component Composition**: Modular component architecture
4. **State Management**: Zustand for efficient state
5. **API Integration**: Axios for HTTP requests

## 📦 Dependencies Overview

| Package | Purpose |
|---------|---------|
| react | UI framework |
| react-router-dom | Client-side routing |
| firebase | Backend services |
| @google/generative-ai | AI capabilities |
| zustand | State management |
| react-hook-form | Form handling |
| tailwindcss | Styling |
| chart.js | Data visualization |
| axios | HTTP requests |
| lucide-react | Icons |

## 🚢 Deployment

### Firebase Hosting
```bash
# Deploy to Firebase
firebase deploy
```

### Build Optimization
```bash
npm run build
```

The `dist/` folder contains production-ready files.

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Verify Firebase credentials in `.env`
   - Check Firestore rules allow access
   - Ensure Firebase project is active

2. **AI API Errors**
   - Verify Google Generative AI key is valid
   - Check API quota limits
   - Ensure API is enabled in Google Cloud Console

3. **Build Errors**
   - Clear `node_modules` and reinstall: `npm install`
   - Clear Vite cache: `rm -rf .vite`
   - Check TypeScript errors: `npm run lint`

## 📖 Documentation

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Generative AI](https://ai.google.dev/)

## 🤝 Contributing

1. Create a feature branch
2. Commit changes with clear messages
3. Push to branch
4. Create Pull Request


## 🎯 Future Enhancements

Potential features to add:
- [ ] Advanced nutrition filters
- [ ] Social sharing features
- [ ] Mobile app version
- [ ] Recipe database integration
- [ ] Workout tracking
- [ ] Integration with fitness devices
- [ ] Advanced analytics dashboard

---

**Last Updated**: December 2025  
**Version**: 0.1.0
