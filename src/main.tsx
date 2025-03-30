import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "sonner";
import "./index.css";


const toastStyles = {
  toastOptions: {
    style: {
      background: "rgb(26 29 35)", 
      color: "white", 
    },
  },
};


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="bottom-right" {...toastStyles} />
    <App />
  </React.StrictMode>
);
