import "remixicon/fonts/remixicon.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import Wrapper from "@/Components/Wrapper/Wrapper";
import ReduxProvider from "@/store/ReduxProvider"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <Wrapper>
            <NextTopLoader />
            {children}
            <ToastContainer />
          </Wrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
