import { useState, useEffect } from "react";
import axios from "axios";
import Toolbar from "./components/Menu";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
import DeletionDialog from "./components/DeletionDialog";

function App() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all contacts
    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/contacts");
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Add or Update Contact
    const handleSubmit = async (contact) => {
        try {
            if (isEditMode) {
                await axios.put(`http://localhost:8080/api/contacts/${contact.id}`, contact);
            } else {
                await axios.post("http://localhost:8080/api/contacts", contact);
            }
            fetchContacts(); // Refresh the list
            setIsFormOpen(false); // Close the form
            alert(isEditMode ? "Contact updated successfully!" : "Contact added successfully!");
        } catch (error) {
            console.error("Error saving contact:", error);
            alert("Failed to save contact. Please try again.");
        }
    };

    // Delete Contact
    const handleDelete = async (id) => {
        setDeleteId(id); // Show dialog instead of immediate deletion
    };

    // Toggle Favorite
    const handleFavoriteToggle = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/api/contacts/${id}/favorite`);
            fetchContacts(); // Refresh the list
        } catch (error) {
            console.error("Error toggling favorites: ", error);
            alert("Failed to toggle favorite. Please try again.");
        }
    };

    // Open Form for Adding or Editing
    const openForm = (contact = null) => {
        setSelectedContact(contact);
        setIsEditMode(!!contact);
        setIsFormOpen(true);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Toolbar onAddContact={() => openForm()} />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-50">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Contacts</h1>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contacts.map((contact) => (
                            <Contact 
                                key={contact.id}
                                {...contact}
                                onEdit={() => openForm(contact)}
                                onDelete={() => handleDelete(contact.id)}
                                onFavoriteToggle={() => handleFavoriteToggle(contact.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Contact Form Modal */}
            {isFormOpen && (
                <ContactForm
                    contact={selectedContact}
                    onSubmit={handleSubmit}
                    onClose={() => {
                        setIsFormOpen(false);
                        setSelectedContact(null);
                    }}
                    isEditMode={isEditMode}
                />
            )}

            {/* Delete Contact Dialog */}
            <DeletionDialog 
                isOpen={deleteId !== null}
                onConfirm={async () => {
                    await axios.delete(`http://localhost:8080/api/contacts/${deleteId}`);
                    fetchContacts();
                    setDeleteId(null);
                }}
                onCancel={() => setDeleteId(null)}
                message="Are you sure you want to delete this contact?"
            />
        </div>
    );
}

export default App;