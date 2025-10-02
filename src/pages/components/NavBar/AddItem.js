import Button from "react-bootstrap/Button";

const AddItem = ({ addToCart, book }) => {
  return (
    <>
      <Button
        onClick={() => addToCart(book)}
        className="modern-add-item"
        variant="success"
        size="sm"
      >
        +
      </Button>
    </>
  );
};

export default AddItem;
