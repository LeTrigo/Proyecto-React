import Button from "react-bootstrap/Button";

function DeleteItem({ deleteFromCart, book }) {
  return (
    <>
      <Button
        onClick={() => deleteFromCart(book)}
        className="modern-delete-item"
        variant="outline-danger"
        size="sm"
      >
        -
      </Button>
    </>
  );
}

export default DeleteItem;
