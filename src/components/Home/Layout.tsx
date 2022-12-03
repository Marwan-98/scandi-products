import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  children: JSX.Element;
  massDelete: () => void;
};

const Layout = ({ children, massDelete }: Props) => {
  return (
    <>
      <header>
        <Navbar
          bg="white"
          variant="light"
          className="border-bottom border-dark"
        >
          <Container>
            <Navbar.Brand href="#home">Product List</Navbar.Brand>
            <Nav>
              <Link to={"/add-product"}>
                <Button variant="success" className="mx-1">
                  ADD
                </Button>
              </Link>
              <Button
                variant="danger"
                className="mx-1"
                id="delete-product-btn"
                onClick={massDelete}
              >
                MASS DELETE
              </Button>
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
