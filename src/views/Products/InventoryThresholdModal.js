import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function InventoryThresholdModal({ show, onHide, item, onSetThreshold }) {
  const [threshold, setThreshold] = useState(item?.threshold || "");

  const handleSetThreshold = () => {
    // Validate threshold value
    if (isNaN(threshold) || threshold === "") {
      // Handle invalid threshold
      return;
    }
    onSetThreshold(item.id, parseInt(threshold, 10));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Set Threshold for {item?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Threshold:
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
        </label>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSetThreshold}>
          Set Threshold
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InventoryThresholdModal;
