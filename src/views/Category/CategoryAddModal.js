

import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function CategoryAddModal({ show, onHide, onAdd }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (!show) {
      setName("");
    }
  }, [show]);

  const handleAdd = () => {
    onAdd({
      name,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryAddModal;

