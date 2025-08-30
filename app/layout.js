import "remixicon/fonts/remixicon.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import Wrapper from "@/Components/Wrapper/Wrapper";
import ReduxProvider from "@/store/ReduxProvider"; 
import Script from "next/script"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
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
