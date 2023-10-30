import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function CategoryViewModal({ show, onHide, item }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>View Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Name: {item?.name}</p>
        <p>Product Count: {item?.productCount}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryViewModal;
