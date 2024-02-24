import { DefaultSeo } from "next-seo";
import SEO from "../path-to-your/seo-config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoogleAnalytics } from "nextjs-google-analytics";
import * as gtag from "../../gtag.js";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    hotjar.initialize(3712734, 6);
  }, []);
  console.log("${process.env.NEXT_PUBLIC_GOOGLE_ID}", process.env.NEXT_PUBLIC_GOOGLE_ID)
  return (
    <>
      <GoogleAnalytics
        trackPageViews
        gaMeasurementId={`${process.env.NEXT_PUBLIC_GOOGLE_ID}`}
      />
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
