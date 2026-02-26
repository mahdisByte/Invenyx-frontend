import { useEffect, useState } from "react"
import API from "../utils/api"
import "../styles/CategoryPage.css"

function CategoryPage() {

  const role = localStorage.getItem("role")

  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editingId, setEditingId] = useState(null)

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await API.get("/category")
      setCategories(res.data)
    } catch (error) {
      console.error(error)
      alert("Error fetching categories")
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Add or Update category
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        await API.put(`/category/${editingId}`, {
          name,
          description
        })
      } else {
        await API.post("/category", {
          name,
          description
        })
      }

      setName("")
      setDescription("")
      setEditingId(null)
      fetchCategories()

    } catch (error) {
      alert("Error saving category")
    }
  }

  // Edit
  const handleEdit = (cat) => {
    setName(cat.name)
    setDescription(cat.description)
    setEditingId(cat.id)
  }

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return

    try {
      await API.delete(`/category/${id}`)
      fetchCategories()
    } catch (error) {
      alert("Error deleting category")
    }
  }

  return (
    <div className="category-container">

      <h2>Category Management</h2>

      {/* ADMIN FORM */}
      {role === "admin" && (
        <form onSubmit={handleSubmit} className="category-form">
          <input
            type="text"
            placeholder="Category Name"
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

          <button type="submit">
            {editingId ? "Update" : "Add"} Category
          </button>
        </form>
      )}

      {/* TABLE */}
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>

              {role === "admin" && (
                <td>
                  <button onClick={() => handleEdit(cat)}>Edit</button>
                  <button onClick={() => handleDelete(cat.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default CategoryPage