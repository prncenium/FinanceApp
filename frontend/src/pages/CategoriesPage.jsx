import { useState, useEffect } from 'react';
import { getCategories, createCategory, deleteCategory } from '../services/CategoryService'

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState('expense'); // Default type
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      setError('Failed to load categories.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError(null);

    if (!newCategoryName.trim()) {
      setError('Category name cannot be empty.');
      return;
    }

    try {
      const response = await createCategory({
        name: newCategoryName,
        type: newCategoryType,
      });
  
      setCategories([...categories, response.data]);
      setNewCategoryName('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category.');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
    
      setCategories(categories.filter(cat => cat._id !== categoryId));
    } catch (err) {
      setError('Failed to delete category.', err);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading Categories...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Categories</h1>

   
      <form onSubmit={handleAddCategory} className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Add New</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Category Name (e.g., Rent)"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
            required
          />
          <select
            value={newCategoryType}
            onChange={(e) => setNewCategoryType(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Category
          </button>
        </div>
      </form>

 
      <div className="bg-white rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          {categories.map(cat => (
            <li key={cat._id} className="flex items-center justify-between p-4">
              <div>
                <div className="text-lg font-medium">{cat.name}</div>
                <div 
                  className={`text-sm font-semibold ${
                    cat.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {cat.type.toUpperCase()}
                </div>
              </div>
              <button 
                onClick={() => handleDeleteCategory(cat._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoriesPage;