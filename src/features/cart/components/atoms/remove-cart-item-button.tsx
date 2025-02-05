'use client';

import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';

import { useCartStore } from '../../store/cart-store';

interface Props {
  variantId: number;
}

const RemoveCartItemButton = ({ variantId }: Props) => {
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const onRemoveFromCartClick = () => {
    removeFromCart(variantId);
    toast.success('Product removed from cart');
  };

  return (
    <Button variant="ghost" size="icon" onClick={onRemoveFromCartClick}>
      <Trash className="text-secondary-darker" />
    </Button>
  );
};

export default RemoveCartItemButton;
