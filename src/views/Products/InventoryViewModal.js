import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function InventoryViewModal({ show, onHide, item }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>View Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Name: {item?.name}</p>
        <p>Category: {item?.category?.name}</p>
        <p>Price: {item?.price}</p>
        <p>Quanity: {item?.quantity}</p>
        <p>Value: {item?.value}</p>
        <p>Threshold: {item?.threshold}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InventoryViewModal;
