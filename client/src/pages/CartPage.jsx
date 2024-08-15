import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Card,
    Navbar,
    Col,
    Button,
    Badge,
    Form
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5100/api/dashboard/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(response.data);
      } catch (error) {
        console.error(`Error fetching current user:`, error);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5100/api/product/cart/${userId}`);
        setCart(response.data.products);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [userId]);

  const updateCartQuantity = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:5100/api/product/cart/quantity/:${userId}`, {
        userId,
        productId,
        quantity,
      });
      setCart(cart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      ));
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const handleIncrease = (productId, currentQuantity) => {
    updateCartQuantity(productId, currentQuantity + 1);
  };

  const handleDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartQuantity(productId, currentQuantity - 1);
    }
  };

  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/e-commerceHomePage">E-commerce</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
           

            
            <Navbar.Text>
              Signed in as:{" "}
              <a href="" style={{ textDecoration: "none" }}>
                {currentUser
                  ? `${currentUser.firstName} ${currentUser.lastName}`
                  : "loading..."}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Container fluid className="mt-4">
      <Row>
        {cart.map(({ product, quantity }) => (
          <Col key={product._id} md={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="pr-3">
                  Quantity: {quantity} {" "}
                  <Button onClick={() => handleDecrease(product._id, quantity)} size="sm">-</Button>
                  <Button className="mx-2" onClick={() => handleIncrease(product._id, quantity)} size="sm">+</Button>
                </Card.Text>
                <Button variant="primary" onClick={() => navigate('/')}>
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default CartPage;
