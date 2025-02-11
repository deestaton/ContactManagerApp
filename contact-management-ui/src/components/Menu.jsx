import { Search, Plus, Pencil, Trash, UserSquare } from "lucide-react";

const Menu = () => {
    return (
        <div className="w-64 p-6 bg-white border-r border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Menu</h2>

            {/* Pagination Dropdown */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">Pagination:</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                    <option value="1000">1,000</option>
                    <option value="10000">10,000</option>
                    <option value="all">All</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
                <button className="w-full flex items-center justify-start p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-all">
                    <UserSquare className="mr-2" size={16} /> Search by ID
                </button>
                <button className="w-full flex items-center justify-start p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-all">
                    <Search className="mr-2" size={16} /> Search All
                </button>
                <button className="w-full flex items-center justify-start p-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-800 transition-all">
                    <Plus className="mr-2" size={16} /> Add New
                </button>
                <button className="w-full flex items-center justify-start p-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg text-indigo-800 transition-all">
                    <Pencil className="mr-2" size={16} /> Update
                </button>
                <button className="w-full flex items-center justify-start p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-800 transition-all">
                    <Trash className="mr-2" size={16} /> Delete
                </button>
            </div>
        </div>
    );
};

export default Menu;