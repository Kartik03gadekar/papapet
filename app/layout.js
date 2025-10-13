"use client";

import "remixicon/fonts/remixicon.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
// import Wrapper from "@/Components/Wrapper/Wrapper";
import TransitionWrapper from "@/Components/TransitionWrapper";
import ReduxProvider from "@/store/ReduxProvider";
import Script from "next/script";
import FacebookPixel from "@/Components/FacebookPixel";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <NextTopLoader />
          <TransitionWrapper>{children}</TransitionWrapper>
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toasterId="default"
            toastOptions={{
              className: "",
              duration: 2000,
              removeDelay: 1000,
              style: {
                background: "#fff",
                color: "#363636",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "green",
                  secondary: "white",
                },
              },
            }}
          />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
            limit={1}
          />
          <FacebookPixel />
        </ReduxProvider>
      </body>
    </html>
  );
}
