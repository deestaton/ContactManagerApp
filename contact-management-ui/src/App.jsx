import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";

function App() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch all contacts
    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/contacts");
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
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
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    // Delete Contact
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/contacts/${id}`);
            fetchContacts(); // Refresh the list
        } catch (error) {
            console.error("Error deleting contact:", error);
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
            <Menu onAddContact={() => openForm()} />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-50">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Contacts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contacts.map((contact) => (
                        <Contact
                            key={contact.id}
                            image={contact.image}
                            firstName={contact.firstName}
                            lastName={contact.lastName}
                            email={contact.email}
                            phone={contact.phone}
                            address={contact.address}
                            isFavorite={contact.isFavorite || false}
                            onFavoriteToggle={() => {
                                // Add logic to toggle favorite in the backend
                                console.log("Toggle favorite for:", contact.id);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Contact Form Modal */}
            {isFormOpen && (
                <ContactForm
                    contact={selectedContact}
                    onSubmit={handleSubmit}
                    onClose={() => setIsFormOpen(false)}
                    isEditMode={isEditMode}
                />
            )}
        </div>
    );
}

export default App;