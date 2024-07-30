import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
