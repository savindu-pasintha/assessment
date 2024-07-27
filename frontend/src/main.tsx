import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/Store.tsx";
import App from "./App.tsx";
import AppRoutes from "./pages/AppRoutes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Suspense fallback={<> ...loading</>}>
      <React.StrictMode>
        <AppRoutes />
      </React.StrictMode>
    </Suspense>
  </Provider>
);
