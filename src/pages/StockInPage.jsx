import { useEffect, useState } from "react";
import API from "../utils/api";
import "../styles/Stock.css";

function StockInPage() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/product");
    setProducts(res.data);
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

  return (
    <div className="stock-container">
      <h2>Stock In</h2>

      <form onSubmit={handleSubmit} className="stock-form">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Current: {p.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
}

export default StockInPage;