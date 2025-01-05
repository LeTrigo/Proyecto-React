import { Container } from "react-bootstrap"
import CardBase from "./CardBase"





const CardList = (props) => {
  return (
    <>
      <Container className="card-container">
        {
            props.books.map(book => <CardBase book={book} key={book.id} /> )
        }
      </Container>
    </>
  )
}

export default CardList