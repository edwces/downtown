import { useAuthInterceptors } from "../auth/hooks/useAuthInterceptors";
import { useAddProductToCartMutation } from "../cart/api/useAddProductToCartMutation";
import { AuthenticatedCartDrawer } from "../cart/AuthenticatedCartDrawer";
import { MainLayout } from "../main/MainLayout";
import { useProducts } from "../product/api/useProducts";
import { Product } from "../product/product.model";
import { ProductsList } from "../product/ProductsList";

type AuthenticatedHomePageProps = { products: Product[] };

export const AuthenticatedHomePage = ({
  products,
}: AuthenticatedHomePageProps) => {
  useAuthInterceptors();
  const { data } = useProducts({ initialData: products });
  const addProductToCart = useAddProductToCartMutation();

  return (
    <>
      <MainLayout>
        <ProductsList
          products={data}
          onAddProductToCart={(id) =>
            addProductToCart.mutate({ productId: id })
          }
        />
      </MainLayout>
      <AuthenticatedCartDrawer />
    </>
  );
};
