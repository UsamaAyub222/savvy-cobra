import Footer from "./components/Footer"
import Header from "./components/Header"
import { Work_Sans} from 'next/font/google'
import './styles/global.css';
// import Loading from "./loading";
import CustomCursor from "./components/CustomCursor";
import GoogleAnalytics from './GoogleAnalytics';
import { Analytics } from '@vercel/analytics/react';
import useHotjar from "./useHotjar";



export const work_sans = Work_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--secondary-font'
  })

  // export const roboto = Roboto({
  //   subsets: ['latin'],
  //   display: 'swap',
  //   weight: ['400', '700'],
  //   variable: '--primary-font'
  // })
export const metadata = {
  title: 'Savvy Cobra | Branding and Interactive Web Experiences',
  description: 'Savvy Cobra is a professional Ottawa-based creative studio offering interactive web design and branding solutions. Transform your digital presence with our creative expertise and cutting-edge technology.',
  keywords: ["graphic design", "branding", "web design", "ottawa", "Savvy Cobra"],
  openGraph: {
    title: 'Savvy Cobra',
    description: 'Branding and Interactive Web Experiences',
    url: 'https://savvycobra.com',
    siteName: 'Savvy Cobra',
    locale: 'en_US',
    type: 'website',
  },
  metadataBase: new URL('https://savvycobra.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
}

export default function Layout({ children }) {
  const siteId = 3691052;
  const hotjarVersion = 6;

  // useHotjar(siteId, hotjarVersion);



  return (
  <html lang="en" className={`${work_sans.variable}`}>
    <body>

    <GoogleAnalytics />
    <Analytics />

    <CustomCursor  >

    {/* <Loading /> */}
    <Header />
      {children}
    <Footer />
    </CustomCursor>
      </body>
  </html>

  )
}