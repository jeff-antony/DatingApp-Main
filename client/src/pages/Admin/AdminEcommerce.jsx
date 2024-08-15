import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Navbar,Table, Button, Modal,
   Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import styled from 'styled-components';

const StyledTable = styled(Table)`
  margin-top: 20px;
`;

const AdminEcommerce = () => {

  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: '',
    name: '',
    category: '',
    description: '',
    price: ''
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5100/api/product/getProducts');
    setProducts(response.data);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    await axios.post('http://localhost:5100/api/product/addProduct', newProduct);
    fetchProducts();
    handleClose();
  };

  const filteredProducts = products.filter(product => 
    product.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
     <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/adminDashboard">Application</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:{" "}
              <a href={`/adminDashboard`} style={{ textDecoration: "none" }}>
                {"Admin"}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className='mt-3'>
      <Row>
      <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Filter</InputGroup.Text>
        <FormControl
          placeholder="Category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </InputGroup>
      <Button onClick={handleShow}>+ New</Button>
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td><img src={product.image} alt={product.name} width="50" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>

            </tr>
          ))}
        </tbody>
      </StyledTable>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control 
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type="text"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" className='mt-2' onClick={handleAddProduct}>
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </Row>
      </Container>
    </>
  )
}

export default AdminEcommerce