
import Button from 'react-bootstrap/Button';



function DeleteItem({deleteFromCart, book}) {

  return (
    <>
      <Button onClick={()=> deleteFromCart(book)} className='DeleteItem' >-</Button>{' '}
    </>
  );
}

export default DeleteItem