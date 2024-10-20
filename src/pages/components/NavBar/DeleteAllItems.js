import { Button } from "react-bootstrap";

function DeleteAllItems({deleteFromCart, book}) {
  return (
    <>
    <Button>
      <img className='delete-all-items' src="/img/trash.png" onClick={()=>deleteFromCart(book, true)}/>
    </Button>
      
    </>
  );
}

export default DeleteAllItems