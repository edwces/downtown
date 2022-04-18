import useMe from '../../../store/useMe';
import useCart from '../../user/hooks/useCart';
import CheckoutList from './CheckoutList';

export default function AuthorizedCheckout() {
  const { user } = useMe();
  const { data, isLoading } = useCart(user!.id);

  return <>{isLoading ? null : <CheckoutList data={data!.items} />}</>;
}
