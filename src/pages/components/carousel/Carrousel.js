import React from 'react';
import { Carousel } from 'react-bootstrap';

const imageSources = [
  { id: 1, src: './img/Logo.jpeg'},
  { id: 2, src: './img/carousel2.jpeg'},
  {id: 3, src: './img/carousel3.avif'},
  {id: 4, src: './img/carousel4.jpeg'},
  {id: 5, src: './img/carousel5.jpeg'},
  {id: 6, src: './img/carousel6.jpeg'},
  {id: 7, src: './img/carousel7.jpeg'},
  {id: 8, src: './img/carousel8.jpg'}
  
 
];

const Carrousel = () => (
  <>
    <Carousel controls={true} indicators={false} touch={true}>
      {imageSources.map(img => (
        <Carousel.Item key={img.id}>
          <img
            className="carousel-img d-block w-100"
            src={img.src}
          />
        </Carousel.Item>
      ))}
    </Carousel>

    <style jsx>{`
      .carousel-img {
        height: 20vh;
      }

      @media (min-width: 768px) {
        .carousel-img {
          height: 50vh;
        }
      }

    `}</style>
  </>
);

export default Carrousel;
