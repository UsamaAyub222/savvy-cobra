'use client'
import { useEffect } from "react";
import Link from 'next/link';
import SideMenu from './SideMenu';
import Image from 'next/image';
import styles from './Header.module.css';
import { usePathname } from 'next/navigation';
import { GoogleAnalytics } from "nextjs-google-analytics";
import Head from "next/head";
import { hotjar } from "react-hotjar";

export default function Header() {

  const router = usePathname();
  const isHomePage = router === '/';
  console.log(isHomePage)
  useEffect(() => {
    hotjar.initialize(3691052, 6);
  }, []);
  return (
    <header>
      <Head>
        <GoogleAnalytics
          trackPageViews
          gaMeasurementId={process.env.NEXT_PUBLIC_GOOGLE_ID}
        />
      </Head>
      <div className="logo">
        <Link className={isHomePage ? 'homePageOnly' : '' }href="/">
          <Image src="/images/logo.svg" alt="logo" width={77} height={128} />
          <h1>Savvy <span> Cobra</span></h1>
        </Link>
      </div>
      <SideMenu />
    </header>
  );
}