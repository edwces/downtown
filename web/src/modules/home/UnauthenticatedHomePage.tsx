import { useLocalCart } from "../cart/hooks/useLocalCart";
import { UnauthenticatedCartDrawer } from "../cart/UnauthenticatedCartDrawer";
import { MainLayout } from "../main/MainLayout";
import { useProducts } from "../product/api/useProducts";
import { Product } from "../product/product.model";
import { ProductsList } from "../product/ProductsList";

type UnauthenticatedHomePageProps = { products: Product[] };

export const UnauthenticatedHomePage = ({
  products,
}: UnauthenticatedHomePageProps) => {
  const { data } = useProducts({ initialData: products });
  const { addOne } = useLocalCart();

  return (
    <>
      <MainLayout>
        <ProductsList products={data} onAddProductToCart={addOne} />
      </MainLayout>
      <UnauthenticatedCartDrawer />
    </>
  );
};
