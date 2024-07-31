import { ReactNode } from 'react';
import React from 'react';
import Head from 'next/head';
import { CoinsData } from '../store/api/coinsApi.type';
import CoinsPage from '../components/CoinsPage/CoinsPage';

type LayoutProps = {
  children?: ReactNode;
  data: CoinsData;
};

const Layout = ({ children, data }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Coins List</title>
        <meta name="description" content="Search any coin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </Head>
      <div>
        <CoinsPage dataProps={data} />
        {children}
      </div>
    </>
  );
};
export default Layout;
