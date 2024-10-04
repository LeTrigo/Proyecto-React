import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SocialIcons from './SocialIcons';

const Footer = () => {
    return (
        <>
            <footer>
                <Container>
                    <Row>
                        <Col className='d-flex justify-content-center' xs={12} md={3}>
                            <img src='./Logo.jpeg' alt='Logo' className='img-fluid rounded-circle' />
                        </Col>
                        <Col xs={12} md={3}>
                            <h5 className='p-2'>Sobre Nosotros</h5>
                            <p>Somos una librería con una gran variedad de libros para todas las edades y gustos.</p>
                            <ul className='list-unstyled'>
                                <li>Condiciones de uso</li>
                                <li>Políticas de privacidad</li>
                            </ul>
                        </Col>
                        <Col xs={12} md={3}>
                            <h5 className='p-2'>Ayuda</h5>
                            <ul className='list-unstyled'>
                                <li>Medios de pago</li>
                                <li>Formas de envío</li>
                                <li>Estado de tu pedido</li>
                                <li>Devoluciones</li>
                            </ul>
                        </Col>
                        <Col xs={12} md={3}>
                            <h5 className='p-2'>¡Síguenos en nuestras redes!</h5>
                            <SocialIcons />
                        </Col>
                    </Row>
                </Container>
            </footer>

            <style jsx>{`
                footer {
                    background-color: #44BED4;
                    color: #021F3F;
                    padding: 20px 0;
                }
                img {
                    height: auto;
                    width: 200px;
                    border-radius: 50%;
                }
                h5 {
                    margin-bottom: 10px;
                }
                li {
                    cursor: pointer;
                    margin-bottom: 5px;
                }
            `}</style>
        </>
    );
}

export default Footer;
