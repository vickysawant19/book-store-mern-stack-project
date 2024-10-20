import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/Router.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import AuthProvider from "./context/AuthContext.jsx";
// import Swal from "sweetalert2";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
