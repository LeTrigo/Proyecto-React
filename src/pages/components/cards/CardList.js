import CardBase from './CardBase'

const CardList = (props) => {
  return (
    <>
        {
            props.books.map(book => <CardBase book={book} />)
        }
    </>
  )
}

export default CardList