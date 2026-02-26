import { useEffect, useState } from "react";
import API from "../utils/api";
import "../styles/SupplierPage.css";

function SupplierPage() {
  const role = localStorage.getItem("role");

  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchSuppliers = async () => {
    try {
      const res = await API.get("/supplier");
      setSuppliers(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching suppliers");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/supplier/${editingId}`, {
          name,
          email,
          phone,
        });
      } else {
        await API.post("/supplier", {
          name,
          email,
          phone,
        });
      }

      setName("");
      setEmail("");
      setPhone("");
      setEditingId(null);
      fetchSuppliers();
    } catch (error) {
      alert("Error saving supplier");
    }
  };

  const handleEdit = (supplier) => {
    setName(supplier.name);
    setEmail(supplier.email || "");
    setPhone(supplier.phone || "");
    setEditingId(supplier.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/supplier/${id}`);
      fetchSuppliers();
    } catch (error) {
      alert("Error deleting supplier");
    }
  };

  return (
    <div className="supplier-container">
      <h2>Supplier Management</h2>

      {/* ADMIN FORM */}
      {role === "admin" && (
        <form onSubmit={handleSubmit} className="supplier-form">
          <input
            type="text"
            placeholder="Supplier Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update" : "Add"} Supplier
          </button>
        </form>
      )}

      {/* TABLE */}
      <table className="supplier-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email || "-"}</td>
              <td>{s.phone || "-"}</td>

              {role === "admin" && (
                <td>
                  <button onClick={() => handleEdit(s)}>Edit</button>
                  <button onClick={() => handleDelete(s.id)}>
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

export default SupplierPage;