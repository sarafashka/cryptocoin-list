import { ReactNode } from 'react';
import React from 'react';
import Head from 'next/head';
import { CoinsData } from '../store/api/coinsApi.type';
import CoinsPage from '../components/CoinsPage/CoinsPage';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

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
      <div className="app container">
        <Header />
        <CoinsPage dataProps={data} />
        {children}
        <Footer />
      </div>
    </>
  );
};
export default Layout;
