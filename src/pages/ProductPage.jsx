import { useEffect, useState } from "react";
import API from "../utils/api";
import "../styles/ProductPage.css";

function ProductPage() {
  const role = localStorage.getItem("role");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch Data
  const fetchProducts = async () => {
    const res = await API.get("/product");
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await API.get("/category");
    setCategories(res.data);
  };

  const fetchSuppliers = async () => {
    const res = await API.get("/supplier");
    setSuppliers(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setCategoryId("");
    setSupplierId("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      categoryId: parseInt(categoryId),
      supplierId: parseInt(supplierId),
    };

    try {
      if (editingId) {
        await API.put(`/product/${editingId}`, payload);
      } else {
        await API.post("/product", payload);
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      alert("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/product/${id}`);
      fetchProducts();
    } catch {
      alert("Error deleting product");
    }
  };

  return (
    <div className="product-container">
      <h2>Product Management</h2>

      {role === "admin" && (
        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button type="submit">
            {editingId ? "Update" : "Add"} Product
          </button>
        </form>
      )}

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Supplier</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description || "-"}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.categoryName}</td>
              <td>{p.supplierName}</td>

              {role === "admin" && (
                <td>
                  <button onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductPage;