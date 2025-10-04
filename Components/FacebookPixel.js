"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const FacebookPixel = () => {
  const [pixelId, setPixelId] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setPixelId(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);
  }, []);

  
  useEffect(() => {
    if (!pixelId || typeof window.fbq !== "function") {
      return;
    }
    window.fbq("track", "PageView");
  }, [pathname, pixelId]);

  
  if (!pixelId) {
    return null;
  }

  return (
    <>
     
      <Script
        id="fb-pixel-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
};

export default FacebookPixel;
