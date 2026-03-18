import { useEffect, useState } from "react";
import API from "../utils/api";

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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

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
    } catch {
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

  // ===== Stats =====
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const lowStock = products.filter((p) => p.quantity < 10).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* ===== Title ===== */}
      <h1 className="text-3xl font-bold text-gray-800">
        Product Management
      </h1>

      {/* ===== Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-2xl font-bold">{totalProducts}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Stock</p>
          <h2 className="text-2xl font-bold">{totalStock}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Low Stock</p>
          <h2 className="text-2xl font-bold text-red-500">
            {lowStock}
          </h2>
        </div>
      </div>

      {/* ===== Main Section ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ===== Form ===== */}
        {role === "admin" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
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
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select Supplier</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editingId ? "Update Product" : "+ Add Product"}
              </button>
            </form>
          </div>
        )}

        {/* ===== Table ===== */}
        <div className="bg-white p-6 rounded-xl shadow overflow-auto">
          <h2 className="text-lg font-semibold mb-4">
            Product List
          </h2>

          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Category</th>
                <th className="p-2">Supplier</th>
                {role === "admin" && <th className="p-2">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2 font-semibold">{p.name}</td>
                  <td className="p-2">${p.price}</td>
                  <td className="p-2">{p.quantity}</td>
                  <td className="p-2">{p.categoryName}</td>
                  <td className="p-2">{p.supplierName}</td>

                  {role === "admin" && (
                    <td className="p-2">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Insights ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Product Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>📦 Manage product inventory efficiently</div>
          <div>📊 Track stock levels in real-time</div>
          <div>⚠️ Monitor low stock to prevent shortages</div>
        </div>
      </div>

    </div>
  );
}

export default ProductPage;