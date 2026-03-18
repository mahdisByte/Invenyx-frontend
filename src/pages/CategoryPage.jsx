import { useEffect, useState } from "react";
import API from "../utils/api";

function CategoryPage() {
  const role = localStorage.getItem("role");

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/category");
      setCategories(res.data);
    } catch {
      alert("Error fetching categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/category/${editingId}`, { name, description });
      } else {
        await API.post("/category", { name, description });
      }

      setName("");
      setDescription("");
      setEditingId(null);
      fetchCategories();
    } catch {
      alert("Error saving category");
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setDescription(cat.description);
    setEditingId(cat.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/category/${id}`);
      fetchCategories();
    } catch {
      alert("Error deleting category");
    }
  };

  // ===== Stats =====
  const totalCategories = categories.length;
  const withDescription = categories.filter(c => c.description).length;
  const emptyDescription = totalCategories - withDescription;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      
      {/* ===== Title ===== */}
      <h1 className="text-3xl font-bold text-gray-800">
        Category Management
      </h1>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Categories</p>
          <h2 className="text-2xl font-bold">{totalCategories}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">With Description</p>
          <h2 className="text-2xl font-bold text-green-600">
            {withDescription}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Missing Description</p>
          <h2 className="text-2xl font-bold text-red-500">
            {emptyDescription}
          </h2>
        </div>
      </div>

      {/* ===== Main Section ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ===== Form (Admin only) ===== */}
        {role === "admin" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editingId ? "Update Category" : "+ Add Category"}
              </button>
            </form>
          </div>
        )}

        {/* ===== Table ===== */}
        <div className="bg-white p-6 rounded-xl shadow overflow-auto">
          <h2 className="text-lg font-semibold mb-4">
            Category List
          </h2>

          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Description</th>
                {role === "admin" && <th className="p-2">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{cat.id}</td>
                  <td className="p-2 font-semibold">{cat.name}</td>
                  <td className="p-2">
                    {cat.description || (
                      <span className="text-gray-400 italic">
                        No description
                      </span>
                    )}
                  </td>

                  {role === "admin" && (
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(cat.id)}
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
          Category Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>📁 Organize products efficiently</div>
          <div>📝 Add descriptions for clarity</div>
          <div>⚡ Keep categories structured and clean</div>
        </div>
      </div>

    </div>
  );
}

export default CategoryPage;