import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";

// Localization
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "ar",
    debug: false,
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    backend: { loadPath: "/portal/assests/locales/{{lng}}/translation.json" },
  });

const loadingMarkup = <div>LOADINGGGGGGGGGGGGGGGGG..................</div>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={loadingMarkup}>
    <BrowserRouter basename="portal">
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </Suspense>
);
