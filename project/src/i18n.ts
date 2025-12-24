import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Home": "Home",
      "About": "About",
      "Dashboard": "Dashboard",
      "Log In": "Log In",
      "Sign Up": "Sign Up",
      "Meal Log": "Meal Log",
      "Track your daily food intake and monitor your nutrition": "Track your daily food intake and monitor your nutrition",
      "Select Language": "Select Language",
      "Add": "Add",
      "Remove": "Remove",
      "Save": "Save",
      "Cancel": "Cancel",
      "Food Name": "Food Name",
      "Portion": "Portion",
      "Calories": "Calories",
      "Protein": "Protein",
      "Carbs": "Carbs",
      "Fat": "Fat",
      "Fiber": "Fiber",
      "Sugar": "Sugar",
      "Sodium": "Sodium",
      // ...add more keys as needed
    }
  },
  es: {
    translation: {
      "Home": "Inicio",
      "About": "Acerca de",
      "Dashboard": "Panel",
      "Log In": "Iniciar sesión",
      "Sign Up": "Registrarse",
      "Meal Log": "Registro de comidas",
      "Track your daily food intake and monitor your nutrition": "Registra tu ingesta diaria de alimentos y controla tu nutrición",
      "Select Language": "Seleccionar idioma",
      "Add": "Agregar",
      "Remove": "Eliminar",
      "Save": "Guardar",
      "Cancel": "Cancelar",
      "Food Name": "Nombre del alimento",
      "Portion": "Porción",
      "Calories": "Calorías",
      "Protein": "Proteína",
      "Carbs": "Carbohidratos",
      "Fat": "Grasa",
      "Fiber": "Fibra",
      "Sugar": "Azúcar",
      "Sodium": "Sodio",
      // ...add more keys as needed
    }
  },
  hi: {
    translation: {
      "Home": "होम",
      "About": "परिचय",
      "Dashboard": "डैशबोर्ड",
      "Log In": "लॉग इन करें",
      "Sign Up": "साइन अप करें",
      "Meal Log": "भोजन लॉग",
      "Track your daily food intake and monitor your nutrition": "अपनी दैनिक भोजन की मात्रा और पोषण की निगरानी करें",
      "Select Language": "भाषा चुनें",
      "Add": "जोड़ें",
      "Remove": "हटाएं",
      "Save": "सहेजें",
      "Cancel": "रद्द करें",
      "Food Name": "भोजन का नाम",
      "Portion": "भाग",
      "Calories": "कैलोरी",
      "Protein": "प्रोटीन",
      "Carbs": "कार्ब्स",
      "Fat": "वसा",
      "Fiber": "फाइबर",
      "Sugar": "चीनी",
      "Sodium": "सोडियम",
      // ...add more keys as needed
    }
  },
  te: {
    translation: {
      "Home": "హోమ్",
      "About": "గురించి",
      "Dashboard": "డాష్‌బోర్డ్",
      "Log In": "లాగిన్",
      "Sign Up": "సైన్ అప్",
      "Meal Log": "ఆహార లాగ్",
      "Track your daily food intake and monitor your nutrition": "మీ రోజువారీ ఆహారాన్ని ట్రాక్ చేయండి మరియు పోషణను పర్యవేక్షించండి",
      "Select Language": "భాషను ఎంచుకోండి",
      "Add": "జోడించండి",
      "Remove": "తొలగించండి",
      "Save": "సేవ్ చేయండి",
      "Cancel": "రద్దు చేయండి",
      "Food Name": "ఆహార పేరు",
      "Portion": "పోర్షన్",
      "Calories": "క్యాలరీలు",
      "Protein": "ప్రోటీన్",
      "Carbs": "కార్బ్స్",
      "Fat": "ఫ్యాట్",
      "Fiber": "ఫైబర్",
      "Sugar": "చక్కెర",
      "Sodium": "సోడియం",
      // ...add more keys as needed
    }
  }
};

// Export resources for debugging
export { resources };

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

console.log('[i18n] Initialized with language:', i18n.language);

export default i18n;
