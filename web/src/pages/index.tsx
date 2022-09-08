import type { NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../modules/main/MainLayout";
import { ProductsList } from "../modules/product/ProductsList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <ProductsList
          products={[
            { label: "T shirt", id: 1 },
            { label: "Pants", id: 2 },
            { label: "Hat", id: 3 },
            { label: "Hoodie", id: 4 },
          ]}
        />
      </MainLayout>
    </>
  );
};

export default Home;
