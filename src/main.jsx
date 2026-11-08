import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router.js";
import store from "./store/index.js";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            background: "#283046",
            color: "white",
          },
        }}
      />
    </Provider>
  </StrictMode>,
);
