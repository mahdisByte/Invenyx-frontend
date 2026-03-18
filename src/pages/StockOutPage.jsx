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

function StockOutPage() {
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
      await API.post("/stock/stock-out", {
        productId: parseInt(productId),
        quantity: parseInt(quantity),
      });

      alert("Stock removed successfully");
      setProductId("");
      setQuantity("");
      fetchProducts();
    } catch {
      alert("Insufficient stock or error");
    }
  };

  const selectedProduct = products.find((p) => p.id == productId);

  // ===== Dashboard Data =====
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const criticalStock = products.filter((p) => p.quantity < 5).length;

  const chartData = products.slice(0, 6).map((p) => ({
    name: p.name,
    stock: p.quantity,
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800">Stock Out</h1>

      {/* ===== Stats ===== */}
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
          <p className="text-gray-500 text-sm">Critical Items</p>
          <h2 className="text-2xl font-bold text-red-500">
            {criticalStock}
          </h2>
        </div>
      </div>

      {/* ===== Main Section ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ===== Form ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-red-600">
            Remove Stock
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Product</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
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
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Info */}
            {selectedProduct && (
              <div className="bg-red-50 text-red-600 p-2 rounded">
                Available: <b>{selectedProduct.quantity}</b>
              </div>
            )}

            <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              - Remove Stock
            </button>
          </form>
        </div>

        {/* ===== Chart ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Product Stock Levels
          </h2>

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

      {/* ===== Insights ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Warnings</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>⚠️ Avoid removing too much stock</div>
          <div>📉 Monitor critical items closely</div>
          <div>🔁 Restock frequently used items</div>
        </div>
      </div>
    </div>
  );
}

export default StockOutPage;