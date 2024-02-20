import React from 'react';
import UserInterface from '@/components/UserInterface';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Feature from '@/components/Feature';
import Footer from '@/components/Footer';

import { PAGE_TITLE } from '@/utils/constants';

const Home: React.FC = () => {
  return (
    <div className="text-gray-600 antialiased">
      {/* <UserInterface backendName="flask" /> */}
      <Layout pageTitle={PAGE_TITLE}>
        <Header />
        <Hero />
        <Feature />
        <Footer />
      </Layout>
    </div>
  );
}
export default Home;