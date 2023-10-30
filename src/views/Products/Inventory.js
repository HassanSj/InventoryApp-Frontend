import React, { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import SweetAlertService from "services/SweetAlertService";
import Swal from "sweetalert2";
import classNames from "classnames";
import InventoryEditModal from "./InventoryEditModal";
import InventoryAddModal from "./InventoryAddModal";
import InventoryViewModal from "./InventoryViewModal";
import InventoryThresholdModal from "./InventoryThresholdModal";

function Inventory() {
  const [categories, setCategories] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItemId, setEditItemId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewItemId, setViewItemId] = useState(null);
  const [thresholds, setThresholds] = useState({});
  const [thresholdItemId, setThresholdItemId] = useState(null);
  const handleSetThreshold = (id, threshold) => {
    const updatedItems = inventoryItems.map((item) => {
      if (item.id === id) {
        item.threshold = threshold;
      }
      return item;
    });
    setInventoryItems(updatedItems);
  };
  const closeThresholdModal = () => {
    setShowThresholdModal(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/inventory/get");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setInventoryItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const handleAdd = async (newItem) => {
    try {
      const response = await fetch("http://localhost:5000/api/inventory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      // Assuming the response contains the newly added item
      const addedItem = await response.json();
      setInventoryItems((prevItems) => [...prevItems, addedItem]);
      fetchData();
      setShowAddModal(false); // Close the add item modal
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle the error (e.g., show an error message)
    }
  };
  const handleDelete = async (id) => {
    SweetAlertService.delete().then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/inventory/deleteinventory/${id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            setInventoryItems((prevItems) =>
              prevItems.filter((item) => item.id !== id)
            );
            SweetAlertService.success(
              "Deleted!",
              "Your file has been deleted."
            );
          } else {
            console.error("Error deleting item:", response.statusText);
          }
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    });
  };
  const handleEdit = (id) => {
    setEditItemId(id);
  };
  const handleView = (id) => {
    setViewItemId(id);
  };
  const handleThresholdChange = (itemId, value) => {
    setThresholds({
      ...thresholds,
      [itemId]: value,
    });
  };
  const handleSaveEdit = async (updatedItem) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/inventory/updateinventory/${updatedItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        const updatedItems = inventoryItems.map((item) => {
          if (item.id === updatedItem.id) {
            return updatedItem;
          } else {
            return item;
          }
        });
        setInventoryItems(updatedItems);
        setEditItemId(null);
      } else {
        console.error("Error updating item:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/category/get");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("DATA", data);
      setCategories(data?.categories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);
  return (
    <>
      {loading ? (
        <Puff type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Container fluid>
          <Row>
            <Col md="12">
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                Add Item
              </Button>
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Inventory Items</Card.Title>
                  <p className="card-category">items</p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Category</th>
                        <th className="border-0">Price</th>
                        <th className="border-0">Quantity</th>
                        <th className="border-0">Value</th>
                        <th className="border-0">Threshold</th>
                        <th className="border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryItems.map((item) => (
                        <tr
                          key={item.id}
                          className={classNames({
                            "red-row":
                              thresholds[item.id] &&
                              item.quantity < thresholds[item.id],
                          })}
                        >
                          <td>{item.id}</td>
                          <td>{item?.name}</td>
                          <td>{item.category.name}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.threshold}</td>
                          <td>{item.value}</td>
                          <Button
                            variant="primary"
                            style={{border : "unset"}}
                            onClick={() => handleView(item.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="success"
                            style={{border : "unset"}}
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            style={{border : "unset"}}
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="info"
                            style={{border : "unset"}}
                            onClick={() => setThresholdItemId(item.id)}
                          >
                            Set Threshold
                          </Button>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      {editItemId !== null && (
        <InventoryEditModal
          show={editItemId !== null}
          onHide={() => setEditItemId(null)}
          onSave={handleSaveEdit}
          item={inventoryItems.find((item) => item.id === editItemId)}
          categories={categories}
        />
      )}

      <InventoryThresholdModal
        show={thresholdItemId !== null}
        onHide={() => setThresholdItemId(null)}
        item={inventoryItems.find((item) => item.id === thresholdItemId)}
        onSetThreshold={handleSetThreshold}
      />
      <InventoryAddModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={handleAdd}
        categories={categories}
      />
      <InventoryViewModal
        show={viewItemId !== null}
        onHide={() => setViewItemId(null)}
        item={inventoryItems.find((item) => item.id === viewItemId)}
      />
    </>
  );
}

export default Inventory;
