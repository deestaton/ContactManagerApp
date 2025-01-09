import { Search, Plus, Pencil, Trash, UserSquare } from "lucide-react";

const Menu = () => {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Menu</h2>
      <div className="space-y-2">
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Pagination:</label>
          <select className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white">
            <option value="1000">Seach by 1,000</option>
            <option value="10000">Seach by 10,000</option>
            <option value="all">Search All</option>
          </select>
        </div>
        <button className="w-full flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 rounded">
          <UserSquare className="mr-2" /> Search by ID
        </button>
        <button className="w-full flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 rounded">
          <Search className="mr-2" /> Search All
        </button>
        <button className="w-full flex items-center justify-center p-2 bg-yellow-500 hover:bg-yellow-600 rounded">
          <Plus className="mr-2" /> Add New Contact
        </button>
        <button className="w-full flex items-center justify-center p-2 bg-indigo-500 hover:bg-indigo-600 rounded">
          <Pencil className="mr-2" /> Update Contact (by ID)
        </button>
        <button className="w-full flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 rounded">
          <Trash className="mr-2" /> Delete Contact (by ID)
        </button>
      </div>
    </div>
  )
}

export default Menu