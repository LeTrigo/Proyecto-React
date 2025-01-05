import Image from 'next/image';


function DeleteAllItems({deleteFromCart, book}) {
  return (
    <>
      <Image className='delete-all-items' src="/img/trash.png" onClick={()=>deleteFromCart(book, true)} alt="delete all items"/>
    </>
  );
}

export default DeleteAllItems