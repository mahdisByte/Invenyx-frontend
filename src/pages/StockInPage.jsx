import { useEffect, useState } from "react";
import API from "../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StockInPage() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product");
      setProducts(res.data);
    } catch {
      alert("Error loading products");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/stock/stock-in", {
        productId: parseInt(productId),
        quantity: parseInt(quantity),
      });

      alert("Stock added successfully");
      setProductId("");
      setQuantity("");
      fetchProducts();
    } catch {
      alert("Error adding stock");
    }
  };

  const selectedProduct = products.find((p) => p.id == productId);

  // ===== Dashboard Data =====
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const lowStock = products.filter((p) => p.quantity < 10).length;

  const chartData = products.slice(0, 6).map((p) => ({
    name: p.name,
    stock: p.quantity,
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800">Stock In</h1>

      {/* ===== Stats Cards ===== */}
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
          <p className="text-gray-500 text-sm">Low Stock Items</p>
          <h2 className="text-2xl font-bold text-red-500">{lowStock}</h2>
        </div>
      </div>

      {/* ===== Main Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ===== Form Card ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Add Stock</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Product</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose product...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Current: {p.quantity})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Quantity</label>
              <input
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {selectedProduct && (
              <div className="bg-blue-50 text-blue-700 p-2 rounded">
                Current Stock: <b>{selectedProduct.quantity}</b>
              </div>
            )}

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Add Stock
            </button>
          </form>
        </div>

        {/* ===== Chart ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Top Products Stock</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Extra Section ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>📦 Manage inventory efficiently</div>
          <div>⚠️ Monitor low stock regularly</div>
          <div>📊 Keep stock levels balanced</div>
        </div>
      </div>
    </div>
  );
}

export default StockInPage;