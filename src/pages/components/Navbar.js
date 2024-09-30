import { BsCartFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
  // const { cartItems } = useContext(CartContext);

  // const [cart, sertCart] = useContext(CartContext);
  // const quantity = cart.reduce((acc, curr) => {
  //   return acc + curr.quantity;
  // }, 0);
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {/* <span> {state.contador}</span> */}
          <BsCartFill />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href=""></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Navbar;
