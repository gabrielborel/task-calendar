import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import Router from "./routes";
import { SessionProvider } from "./contexts/SessionContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SessionProvider>
      <Router />
    </SessionProvider>
  </React.StrictMode>
);
