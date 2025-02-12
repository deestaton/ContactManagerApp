// import axios from "axios";
import { Heart, HeartOff } from "lucide-react";
import PropTypes from "prop-types";

interface ContactProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    isFavorite: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onFavoriteToggle: () => void;
}

const Contact = ({ 
    id, 
    firstName, 
    lastName, 
    email, 
    phone, 
    address, 
    isFavorite, 
    onEdit, 
    onDelete, 
    onFavoriteToggle,
 }: ContactProps) => {

    return (
        <div className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            {/* Favorite Button */}
            <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-blue-500"
                onClick={onFavoriteToggle}
                aria-label="Toggle Favorite"
            >
                {isFavorite ? (
                    <Heart className="w-5 h-5 text-red-500" />
                ) : (
                    <HeartOff className="w-5 h-5 text-gray-400" />
                )}
            </button>

            {/* Avatar */}
            <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-2xl">
                    {firstName?.[0] || "?"}
                </div>
            </div>

            {/* Contact Details */}
            <div className="text-center">
                <div className="text-xl font-semibold">
                    {firstName} {lastName}
                </div>
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <p className="truncate">{email}</p>
                    <p>{phone}</p>
                    <p className="truncate">{address}</p>
                </div>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={onEdit}
                    className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};


Contact.propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired,
};

export default Contact;