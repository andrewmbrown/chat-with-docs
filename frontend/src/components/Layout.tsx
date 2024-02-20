import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { PAGE_TITLE, DESCRIPTION, CANONICAL, LOCALE, SITE_NAME  } from '@/utils/constants';

type LayoutProps = {
  pageTitle: string;
  children: React.ReactNode;
};


const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
  const router = useRouter();
      return (
        <div>
          <Head>
            <title>{pageTitle}</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          </Head>
          <div>
            {children}
          </div>
          <NextSeo
            title={PAGE_TITLE}
            description={DESCRIPTION}
            canonical={CANONICAL}
            openGraph={{
              title: PAGE_TITLE,
              description: DESCRIPTION,
              url: CANONICAL,
              locale: LOCALE,
              site_name: SITE_NAME,
          }}
          />
        </div>
      )
}
export default Layout;