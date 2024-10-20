
import Button from 'react-bootstrap/Button';

const AddItem = ({addToCart, book}) => {
 
  return (
    <>
      <Button onClick={()=> addToCart(book)} className='AddItem' >+</Button>
    </>
  )
}

export default AddItem