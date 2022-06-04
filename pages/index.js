import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import FooterBanner from "../components/FooterBanner";
import Product from "../components/Product";

import { client } from "../lib/client";

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h1>Best Selling Programs </h1>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
