import { Container } from "react-bootstrap";
import CardBase from "./CardBase";

const CardList = (props) => {
  return (
    <>
      <Container className="products-container">
        <div className="products-grid">
          {props.books.map((book) => (
            <CardBase book={book} key={book.id} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default CardList;
