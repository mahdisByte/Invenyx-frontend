import { useEffect, useState } from "react";
import API from "../utils/api";

function SupplierPage() {
  const role = localStorage.getItem("role");

  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await API.get("/supplier");
      setSuppliers(res.data);
    } catch {
      alert("Error fetching suppliers");
    }
  };

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
    } catch {
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
    } catch {
      alert("Error deleting supplier");
    }
  };

  // ===== Stats =====
  const totalSuppliers = suppliers.length;
  const withEmail = suppliers.filter((s) => s.email).length;
  const withPhone = suppliers.filter((s) => s.phone).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* ===== Title ===== */}
      <h1 className="text-3xl font-bold text-gray-800">
        Supplier Management
      </h1>

      {/* ===== Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Suppliers</p>
          <h2 className="text-2xl font-bold">{totalSuppliers}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">With Email</p>
          <h2 className="text-2xl font-bold text-green-600">
            {withEmail}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">With Phone</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {withPhone}
          </h2>
        </div>
      </div>

      {/* ===== Main Section ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ===== Form ===== */}
        {role === "admin" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Supplier" : "Add Supplier"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Supplier Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editingId ? "Update Supplier" : "+ Add Supplier"}
              </button>
            </form>
          </div>
        )}

        {/* ===== Table ===== */}
        <div className="bg-white p-6 rounded-xl shadow overflow-auto">
          <h2 className="text-lg font-semibold mb-4">
            Supplier List
          </h2>

          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                {role === "admin" && <th className="p-2">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {suppliers.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{s.id}</td>
                  <td className="p-2 font-semibold">{s.name}</td>
                  <td className="p-2">
                    {s.email || (
                      <span className="text-gray-400 italic">No Email</span>
                    )}
                  </td>
                  <td className="p-2">
                    {s.phone || (
                      <span className="text-gray-400 italic">No Phone</span>
                    )}
                  </td>

                  {role === "admin" && (
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(s.id)}
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
          Supplier Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>🏭 Manage supplier relationships efficiently</div>
          <div>📞 Keep contact info updated</div>
          <div>📦 Ensure reliable product sourcing</div>
        </div>
      </div>

    </div>
  );
}

export default SupplierPage;