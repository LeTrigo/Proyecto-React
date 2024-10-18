import { CartContext } from '@/context/cartContext';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';



function DeleteItem() {
  const {removeFromCart}= useContext(CartContext)
  return (
    <>
      <Button className='DeleteItem' removeFromCart={removeFromCart}>-</Button>{' '}
    </>
  );
}

export default DeleteItem