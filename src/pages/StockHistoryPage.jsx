import { useEffect, useState } from "react";
import API from "../utils/api";
import "../styles/Stock.css";

function StockHistoryPage() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    const res = await API.get("/stock");
    setStocks(res.data);
  };

  return (
    <div className="stock-container">
      <h2>Stock Overview</h2>

      <table className="stock-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Available Quantity</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s.productId}>
              <td>{s.productId}</td>
              <td>{s.productName}</td>
              <td>{s.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockHistoryPage;