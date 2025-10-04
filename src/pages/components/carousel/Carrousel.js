import React from "react";
import { Carousel } from "react-bootstrap";
import Image from "next/image";

const imageSources = [
  { id: 1, src: "/img/Logo.jpeg" },
  { id: 2, src: "/img/carousel2.jpeg" },
  { id: 3, src: "/img/carousel3.avif" },
  { id: 4, src: "/img/carousel4.jpeg" },
  { id: 5, src: "/img/carousel5.jpg" },
  { id: 6, src: "/img/carousel6.jpg" },
  { id: 7, src: "/img/carousel7.jpg" },
  { id: 8, src: "/img/carousel8.jpg" },
];

const Carrousel = () => (
  <>
    <Carousel controls={true} indicators={false} touch={true}>
      {imageSources.map((img) => (
        <Carousel.Item key={img.id}>
          <row className="carousel-item">
            <Image
              className="carousel-img d-block w-100"
              src={img.src}
              alt="First slide"
              width={800}
              height={550}
            />
          </row>
        </Carousel.Item>
      ))}
    </Carousel>

    <style jsx>{`
      .carousel-img {
        height: 20vh;
        width: 80vh !important;

        object-fit: contain;
      }

      .carousel-item {
        display: flex;
        justify-content: center;
        background-color: rgb(170, 170, 170, 70%);
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
