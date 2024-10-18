import Button from 'react-bootstrap/Button';




function BuyButton({addToCart, book}) {

  return (
    <>
    <Button onClick={()=> addToCart(book) }className='buy-button'  >Comprar</Button>{' '} 

      {/* <Button className='buy-button' addToCart={addToCart} book={props.book} >Comprar</Button>{' '} */}
    </>
  );
}

export default BuyButton