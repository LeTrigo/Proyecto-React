import { Button } from "react-bootstrap";

function DeleteAllItems({deleteFromCart, book}) {
  return (
    <>
      <img className='delete-all-items' src="/img/trash.png" onClick={()=>deleteFromCart(book, true)}/>
    </>
  );
}

export default DeleteAllItems