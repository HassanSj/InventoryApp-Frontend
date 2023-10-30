import React from "react";
import { Container } from "react-bootstrap";
const Footer = () => {
  return (
    <footer className="footer px-0 px-lg-3">
      <Container fluid>
        <nav>
          <p className="copyright text-center">
            © {new Date().getFullYear()}{" "}
            <a href="https://www.linkedin.com/in/hassan-s-881607224/">
              Hassan Sajjad
            </a>
            , made with React and Node
          </p>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
