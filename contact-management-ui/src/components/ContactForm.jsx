import { useState } from "react";
import PropTypes from "prop-types";


const ContactForm = ({ contact, onSubmit, onClose, isEditMode }) => {
    const [formData, setFormData] = useState({
        firstName: contact?.firstName || "",
        lastName: contact?.lastName || "",
        email: contact?.email || "",
        phone: contact?.phone || "",
        address: contact?.address || "",
        photo: contact?.photo || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, id: contact?.id });
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
                {isEditMode ? "Edit Contact" : "Add New Contact"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input 
                        type="text"
                        name="firstName"
                        placeholder='First Name'
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />

                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input 
                        type="text"
                        name="lastName"
                        placeholder='Last Name'
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />

                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />

                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input 
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input 
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    <label className="block text-sm font-medium mb-1">Photo</label>
                    <input 
                        type="file"
                        name="photo"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setFormData({ ...formData, photo: reader.result });
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        {isEditMode ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

// PropTypes validation
ContactForm.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.number,
        photo: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isEditMode: PropTypes.bool.isRequired,
};


export default ContactForm;