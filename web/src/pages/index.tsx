import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { UnauthenticatedCartDrawer } from "../modules/cart/UnauthenticatedCartDrawer";
import { MainLayout } from "../modules/main/MainLayout";
import { getProducts, useProducts } from "../modules/product/api/useProducts";
import { Product } from "../modules/product/product.model";
import { ProductsList } from "../modules/product/ProductsList";

type HomeProps = { products: Product[] };

const Home: NextPage<HomeProps> = ({ products }) => {
  const { data } = useProducts({ initialData: products });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <ProductsList products={data} />
      </MainLayout>
      <UnauthenticatedCartDrawer />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const products = await getProducts();

  return { props: { products } };
};

export default Home;
