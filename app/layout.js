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
          <ToastContainer
            position="top-right"
            autoClose={1000} // disappear in 1 sec
            hideProgressBar // no progress bar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
            limit={1} // only one popup at a time
          />
          <FacebookPixel />
        </ReduxProvider>
      </body>
    </html>
  );
}
