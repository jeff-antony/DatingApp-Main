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
import { FaShoppingCart } from "react-icons/fa";

const EcommerceHomePage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5100/api/product/getProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
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

  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:5100/api/product/addCart", {
        userId,
        productId: product._id,
      });
      setCart([...cart, { product, quantity: 1 }]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const goToCartPage = () => {
    navigate(`/cart/${userId}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">E-commerce</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Form className="d-flex me-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>

            <Button
              variant="outline-light"
              onClick={goToCartPage}
              className="me-3"
            >
              <FaShoppingCart />
              <Badge pill bg="danger">
                {cart.length}
              </Badge>
            </Button>
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
          {filteredProducts.map((product) => (
            <Col key={product._id} md={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    Add to Cart
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

export default EcommerceHomePage;
