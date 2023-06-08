"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { AiFillCloseCircle } from "react-icons/ai";
import { localStorageExpires, getLocalStorage } from "@/util/Helpers";

function Header() {


  const [CardItems, setCardItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartItems_other, setCartItems__other] = useState(
      JSON.parse(localStorage.getItem("cartItems")) || []
  );

  useEffect(() => {
    setCardItems(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, [localStorage.getItem("cartItems")]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show_m2, setShow_m2] = useState(false);
  const handleClose_m2 = () => setShow_m2(false);
  const handleShow_m2 = () => setShow_m2(true);

  let total_products = 0;
  let only_tax = 0;
  let total_quant = 0;
  let all_value = 0;

  CardItems?.map(
      (item) => (
          (all_value = item.value + all_value),
              (total_products = parseFloat(item.total) + total_products),
              (only_tax = ( (item.tax / 100) * item.value)   ),
              (total_quant = item.quantity + total_quant)
      )
  );

  const removeItem = (index) => {
    setLoading(true);

    setTimeout(() => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      setLoading(false);
    }, 2000);
  };

  const paymentF = () => {
    setLoading(true);

    setTimeout(() => {
      const paymentItems = {
        valueOutTax: all_value,
        valueTotal: total_products,
        total_quant: total_quant,
        only_tax: only_tax,
      };

      localStorage.setItem("sale", JSON.stringify(paymentItems));
      localStorage.removeItem("cartItems");
      handleClose();
      handleShow_m2();
      setLoading(false);
    }, 2000);
  };

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  const myShopping = JSON.parse(localStorage.getItem("sale")) || [];

  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            {getLocalStorage("nome") ? getLocalStorage("nome") : "Visitante"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {getLocalStorage("nome") ? (
                <Nav className="me-auto">
                  <NavDropdown title="Admin" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="products/">
                      Cadastrar produtos
                    </NavDropdown.Item>
                    <NavDropdown.Item href="category/">
                      {" "}
                      Categorias Categorias{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="tax/">
                      Cadastrar Imposto
                    </NavDropdown.Item>

                    <NavDropdown.Item href="users/">
                      Cadastrar Usuário
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
            ) : (
                ""
            )}

            <Nav>
              <Nav.Link onClick={handleShow_m2}>Ultima Compra</Nav.Link>
              <Nav.Link eventKey={2} href="/perfil  ">
                {" "}
                Perfil{" "}
              </Nav.Link>
              <Nav.Link eventKey={2} href="/login">
                Login
              </Nav.Link>
              <Nav.Link href="#deets" className="" onClick={handleShow}>
                <FaShoppingCart className="me-2" />
                <Badge className="badge badge-warning">{CardItems.length}</Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Todos os items:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>
                  <small>Nome </small>
                </th>
                <th>
                  <small>Unidade </small>
                </th>
                <th>
                  <small>Imposto </small>
                </th>
                <th>
                  <small>Quantidade </small>
                </th>
                <th>
                  <small>Total</small>
                </th>
              </tr>
              </thead>
              <tbody>
              {CardItems?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <small>{item.name}</small>
                    </td>
                    <td>
                      <small>{item.value}</small>
                    </td>
                    <td>
                      <small>{item.tax}</small>
                    </td>
                    <td>
                      <small>{item.quantity}</small>
                    </td>
                    <td>
                      <small>{item.total}</small>
                    </td>
                    <td>
                      <Button disabled={loading} onClick={() => removeItem()}>
                        <AiFillCloseCircle />
                      </Button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </Table>

            <ListGroup>
              <ListGroup.Item>
                Valor de todos os produtos: {all_value}
              </ListGroup.Item>
              <ListGroup.Item>
                Valor de imposto a se pago: {only_tax}
              </ListGroup.Item>
              <ListGroup.Item>Quantidade: {total_quant}</ListGroup.Item>
              <ListGroup.Item>Total: {total_products}</ListGroup.Item>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Sair
            </Button>
            <Button variant="primary" onClick={paymentF}>
              {loading ? (
                  <Spinner animation="border" variant="warning" />
              ) : (
                  <span>Finalizar compra!</span>
              )}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show_m2} onHide={handleClose_m2}>
          <Modal.Header closeButton>
            <Modal.Title>Nota fiscal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>
                  <small>Valor sem o imposto </small>
                </th>
                <th>
                  <small>Apenas o Imposto </small>
                </th>
                <th>
                  <small>Quantidade </small>
                </th>
                <th>
                  <small>Valor Total</small>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <small>{myShopping?.valueOutTax}</small>
                </td>
                <td>
                  <small>{myShopping?.only_tax}</small>
                </td>
                <td>
                  <small>{myShopping?.total_quant}</small>
                </td>
                <td>
                  <small>{myShopping?.valueTotal}</small>
                </td>
              </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose_m2}>
              Sair
            </Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
  );
}

export default Header;
