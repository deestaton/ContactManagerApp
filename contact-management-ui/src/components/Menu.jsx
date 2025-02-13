import { useState } from "react";
import { Plus, Menu as MenuIcon, X } from "lucide-react";
import PropTypes from "prop-types";

const Menu = ({ onAddContact }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`${isCollapsed ? "w-16" : "w-64"} p-4 bg-white border-r border-gray-200 shadow-sm transition-all duration-300`}>
            {/* Collapse Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 mb-4 bg-gray-100 hover:bg-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500"
            >
                {isCollapsed ? <MenuIcon size={20} /> : <X size={20} />}
            </button>

            {/* Buttons */}
            <div className="space-y-3">
                <button
                    onClick={onAddContact}
                    className="w-full flex items-center justify-start p-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-800 transition-all focus:ring-2 focus:ring-blue-500"
                >
                    <Plus className="mr-2" size={16} /> {!isCollapsed && "Add New"}
                </button>
                {/* Add other buttons here */}
            </div>
        </div>
    );
};

Menu.propTypes = {
    onAddContact: PropTypes.func.isRequired,
};

export default Menu;