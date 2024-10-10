import CardBase from './CardBase'




const CardList = (props) => {
  return (
    <>
      <div>
        {
            props.books.map(book => <CardBase book={book} />)
        }
      </div>
    </>
  )
}

export default CardList