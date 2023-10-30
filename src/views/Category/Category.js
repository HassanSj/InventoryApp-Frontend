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
import CategoryEditModal from "./CategoryEditModal";
import CategoryAddModal from "./CategoryAddModal";
import CategoryViewModal from "./CategoryViewModal";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItemId, setEditItemId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewItemId, setViewItemId] = useState(null);

  const fetchData = async () => {
    try {
      
      const response = await fetch("https://inventory-app-backend-one.vercel.app/api/category/get");
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
  const handleAdd = async (newItem) => {
    try {
      const response = await fetch(
        "https://inventory-app-backend-one.vercel.app/api/category/addCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      // Assuming the response contains the newly added item
      const addedItem = await response.json();
      setCategories((prevItems) => [...prevItems, addedItem]);
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
            `https://inventory-app-backend-one.vercel.app/api/category/deleteCategory/${id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            setCategories((prevItems) =>
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
  const handleSaveEdit = async (updatedItem) => {
    try {
      const response = await fetch(
        `https://inventory-app-backend-one.vercel.app/api/category/updateCategory/${updatedItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        const updatedItems = categories.map((item) => {
          if (item.id === updatedItem.id) {
            return updatedItem;
          } else {
            return item;
          }
        });
        setCategories(updatedItems);
        setEditItemId(null); // Close the edit form
      } else {
        console.error("Error updating item:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
                  <Card.Title as="h4">Categories</Card.Title>
                  <p className="card-category">items</p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Products</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.productCount}</td>
                          <Button
                            style={{ border: "unset" }}
                            variant="primary"
                            onClick={() => handleView(item.id)}
                          >
                            View
                          </Button>
                          <Button
                            style={{ border: "unset" }}
                            variant="success"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            style={{ border: "unset" }}
                            variant="danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
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
        <CategoryEditModal
          show={editItemId !== null}
          onHide={() => setEditItemId(null)}
          onSave={handleSaveEdit}
          item={categories.find((item) => item.id === editItemId)}
        />
      )}
      <CategoryAddModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={handleAdd}
      />
      <CategoryViewModal
        show={viewItemId !== null}
        onHide={() => setViewItemId(null)}
        item={categories.find((item) => item.id === viewItemId)}
      />
    </>
  );
}

export default Category;
