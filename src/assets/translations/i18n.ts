import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

export const defaultNS = 'ns1';

const resources = {
  en: {
    translation: {
      english: "English",
      spanish: "Spanish",
      home: "Home",
      solutions: "Solutions",
      support: "Support and security",
      about: "About us",
      faqs: "FAQs",
      login: "Sign in",
      correspondTo: "correspond to",
      mainTitle: "Stop losing dollars in your international payments",
      subTitle: "We offer the best technology and infrastructure to process individual, bulk, and API international payments.",
      openAccount: "Open account",
      scheduleDemo: "Schedule demo",
      logistics: 'Logistics',
      ecommerce: 'Ecommerce',
      exports: 'Exports',
      imports: 'Imports',
      fintech: 'Fintech',
      youReceive: 'You receive',
      youSend: 'You send',
    },
  },
  es: {
    translation: {
      english: "Inglés",
      spanish: "Español",
      home: "Inicio",
      solutions: "Soluciones",
      support: "Soporte y seguridad",
      about: "Confían en nosotros",
      faqs: "FAQs",
      login: "Entrar",
      correspondTo: 'corresponden a',
      mainTitle: "Envía y automatiza pagos internacionales para",
      subTitle: "Ofrecemos la mejor tecnología e infraestructura para procesar pagos internacionales individuales, masivos y a través de API.",
      openAccount: "Abrir cuenta",
      scheduleDemo: "Agendar demo",
      logistics: 'Logística',
      ecommerce: 'Ecommerce',
      exports: 'Exportaciones',
      imports: 'Importaciones',
      fintech: 'Fintech',
      youReceive: 'Tu contacto recibe',
      youSend: 'Tu envías',
    },
  },
};

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;