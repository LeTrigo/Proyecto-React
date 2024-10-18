import CardList from "./CardList";

// const books = [
//     {
//       id: "1",
//       name: "Aprender a programar en C",
//       price: 20000,
//       image: "img/aprender-a-programar-en-c.jpeg",
//       description: "Aprende a programar en C desde 0 con este grandioso libro"
//     },
//     {
//       id: "2",
//       name: "Caperucita Roja",
//       price: 10000,
//       image: "img/caperucita-roja.jpeg",
//       description: "Un gran cuento para niños"
//     },
//     {
//       id: "3",
//       name: "DC comics",
//       price: 17000,
//       image: "img/dc-comics.jpeg",
//       description: "Adentrate en las grandes aventuras de los heroes de DC"
//     },
//     {
//       id: "4",
//       name: "Deja de ser tu",
//       price: 40000,
//       image: "img/deja-de-ser-tu.jpeg",
//       description: "Cambia tu perspectiva, y cambia tu realidad"
//     },
//     {
//       id: "5",
//       name: "El libro de la selva",
//       price: 12000,
//       image: "img/el-libro-de-la-selva.jpeg",
//       description: "Un gran cuento de aventuras para niños"
//     },
//     {
//       id: "6",
//       name: "Eloquent JS",
//       price: 30000,
//       image: "img/eloquent-js.jpeg",
//       description: "Aprende todo lo que necesitas saber con este gran libro de JavaScript"
//     },
//     {
//       id: "7",
//       name: "Harry Potter: El legado maldito",
//       price: 45000,
//       image: "img/harry-potter-el-legado-maldito.jpeg",
//       description: "Disfruta de la gran historia de Harry Potter"
//     },
//     {
//       id: "8",
//       name: "Harry Potter: La piedra filosofal",
//       price: 43000,
//       image: "img/harry-potter-y-la-piedra-filosofal.jpeg",
//       description: "Disfruta de la gran historia de Harry Potter"
//     },
//     {
//       id: "9",
//       name: "Marvel Comics",
//       price: 20000,
//       image: "img/marvel-comics.jpeg",
//       description: "Adentrate en las aventuras de los heroes de Marvel"
//     },
//     {
//       id: "10",
//       name: "El poder del ahora",
//       price: 35000,
//       image: "img/poder-del-ahora.jpg",
//       description: "Aprende técnicas para vivir en el presente y disfrutar todo lo que hagas"
//     },
//     {
//       id: "11",
//       name: "Poder sin Límites",
//       price: 39000,
//       image: "img/poder-sin-limites.jpeg",
//       description: "Saca todo el potencial que llevas dentro con este libro"
//     },
//     {
//       id: "12",
//       name: "Emociones Nutritivas",
//       price: 26000,
//       image: "img/stamateas-emociones-nutritivas.jpeg",
//       description: "Con este libro descubriras las emociones más importantes"
//     },
//     {
//       id: "13",
//       name: "Gente tóxica",
//       price: 28000,
//       image: "img/stamateas-gente-toxica.jpeg",
//       description: "Aprende a identificar a las personas tóxicas"
//     },
//     {
//       id: "14",
//       name: "Pensamientos Nutritivos",
//       price: 25000,
//       image: "img/stamateas-pensamientos-nutritivos.jpeg",
//       description: "Con este libro aprenderas a pensar de la manera correcta"
//     },
//     {
//       id: "15",
//       name: "El visitante de Stephen King",
//       price: 46000,
//       image: "img/stephen-king-el-visitante.jpeg",
//       description: "Adentrate en la terrorifica historia del visitante"
//     },
//     {
//       id: "16",
//       name: "IT de Stephen King",
//       price: 50000,
//       image: "img/stephen-king-it.jpeg",
//       description: "Adentrate en la terrorifica historia del payaso maldito"
//     },
//     {
//       id: "17",
//       name: "Misery Stephen King",
//       price: 48000,
//       image: "img/stephen-king-misery.jpeg",
//       description: "Adentrate en la terrorifica historia de misery"
//     }
//   ];


  
  const CardContainer = ({books}) => {
    return (
      <>
          <CardList books={books} />
      </>
    )
  }
  
  export default CardContainer