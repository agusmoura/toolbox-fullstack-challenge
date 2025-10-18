import React from "react";
import { Badge, Container, Navbar } from "react-bootstrap";
import "./Header.css";
import Icon from "./ui/Icon";

const Header = () => {
  return (
    <Navbar className="custom-navbar shadow-sm">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <div className="brand-icon me-3">
            <Icon name="logo" size={32} color="white" />
          </div>
          <div>
            <div className="brand-title">
              Toolbox challenge - CSV Data Viewer
            </div>
            <div className="brand-subtitle">React + Redux</div>
          </div>
        </Navbar.Brand>
        <Badge bg="light" text="dark" className="status-badge">
          <span className="status-dot"></span>
          Live
        </Badge>
      </Container>
    </Navbar>
  );
};

export default Header;
