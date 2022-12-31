import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const name = "Aim at fingertips";
export const siteTitle = "A Sample blog";

type Props = {
  home?: boolean;
  children?: ReactNode;
};

const Layout: FC<Props> = function ({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="志在指尖, 一个专注于编程的博客" />
        <link rel="icon" href="/finger.svg" />

        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={name} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

{/*       
      <section className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </section>
      <main>{children}</main> */}
     
     
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <Footer isFixed></Footer>
    </div>
  );
};

export default Layout;
