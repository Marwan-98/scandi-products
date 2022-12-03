import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <header>
        <Navbar
          bg="white"
          variant="light"
          className="border-bottom border-dark"
        >
          <Container>
            <Navbar.Brand href="#home">Product Add</Navbar.Brand>
            <Nav>
              <Button
                variant="success"
                className="mx-1"
                type="submit"
                form="product_form"
              >
                Save
              </Button>
              <Link to="/">
                <Button
                  variant="danger"
                  className="mx-1"
                  id="delete-product-btn"
                >
                  Cancel
                </Button>
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      {children}
      <footer className="p-4 border-top border-dark">
        Scandiweb Test assignment
      </footer>
    </>
  );
};

export default Layout;
