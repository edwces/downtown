import { MainLayout } from "../main/MainLayout";
import { useProducts } from "../product/api/useProducts";
import { Product } from "../product/product.model";
import { ProductsList } from "../product/ProductsList";

type AuthenticatedHomePageProps = { products: Product[] };

export const AuthenticatedHomePage = ({
  products,
}: AuthenticatedHomePageProps) => {
  const { data } = useProducts({ initialData: products });

  return (
    <>
      <MainLayout>
        <ProductsList
          products={data}
          onAddProductToCart={() => console.log("Added to account cart")}
        />
      </MainLayout>
    </>
  );
};
