import CardContainer from "./components/cards/CardContainer";
import Carrousel from "./components/carousel/Carrousel";
import Footer from "./components/footer/Footer";
import InfoCard from "./components/InfoCard";
import NavBar from "./components/NavBar/NavBar";
import ProposelCard from "./components/ProposelCard";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Home() {
  return (
    <>
      <NavBar />
      <ProposelCard />
      <CardContainer />
      <InfoCard />
      <Carrousel />
      <Footer />
    </>

  );
}


