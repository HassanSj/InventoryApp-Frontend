import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function InventoryAddModal({ show, onHide, onAdd, categories }) {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [value, setValue] = useState("");
  const [threshold, setThreshold] = useState("");

  useEffect(() => {
    if (!show) {
      setName("");
      setSelectedCategory("");
      setPrice("");
      setQuantity("");
      setValue("");
      setThreshold("");
    }
  }, [show]);

  const handleAdd = () => {
    onAdd({
      name,
      category: selectedCategory,
      price,
      quantity,
      value,
      threshold,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Inventory Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <label>
          Value:
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <label>
          Threshold:
          <input
            type="number"
            threshold={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
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

export default InventoryAddModal;
