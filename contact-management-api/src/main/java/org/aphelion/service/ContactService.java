package org.aphelion.service;

import org.aphelion.model.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    private final String dbUrl;

    @Autowired
    public ContactService(String dbUrl) {
        this.dbUrl = dbUrl;
    }

    // create a new contact
    public Contact createContact(Contact contact) throws SQLException {
        String sql = """
            INSERT INTO contacts (first_name, last_name, email, phone, address)
            VALUES (?, ?, ?, ?, ?)
        """;

        String getLastId = "SELECT last_insert_rowid()";

        try (Connection conn = DriverManager.getConnection(dbUrl);
             PreparedStatement pstmt = conn.prepareStatement(sql);
             Statement stmt = conn.createStatement()) {

            pstmt.setString(1, contact.getFirstName());
            pstmt.setString(2, contact.getLastName());
            pstmt.setString(3, contact.getEmail());
            pstmt.setString(4, contact.getPhone());
            pstmt.setString(5, contact.getAddress());

            int affectedRows = pstmt.executeUpdate();

            if (affectedRows > 0) {
                try (ResultSet rs = pstmt.executeQuery(getLastId)) {
                    if (rs.next()) {
                        contact.setId((rs.getLong(1)));
                        return contact;
                    }
                }
            }
        }
        return null;
    }

    // get a contact by ID
    public Optional<Contact> getContactById(Long id) throws SQLException {
        String sql = "SELECT * FROM contacts WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(dbUrl);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setLong(1, id);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(new Contact(
                            rs.getLong("id"),
                            rs.getString("first_name"),
                            rs.getString("last_name"),
                            rs.getString("email"),
                            rs.getString("phone"),
                            rs.getString("address")
                    ));
                }
            }
        }
        return Optional.empty();
    }

    // get all contacts
    public List<Contact> getAllContacts() throws SQLException {
        String sql = "SELECT * FROM contacts";
        List<Contact> contacts = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(dbUrl);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                contacts.add(new Contact(
                        rs.getLong("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("email"),
                        rs.getString("phone"),
                        rs.getString("address")
                ));
            }
        }
        return contacts;
    }

    // update a contact
    public boolean updateContact(Contact contact) throws SQLException {
        String sql = """
            UPDATE contacts
            SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;

        try (Connection conn = DriverManager.getConnection(dbUrl);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, contact.getFirstName());
            pstmt.setString(2, contact.getLastName());
            pstmt.setString(3, contact.getEmail());
            pstmt.setString(4, contact.getPhone());
            pstmt.setString(5, contact.getAddress());
            pstmt.setLong(6, contact.getId());

            return pstmt.executeUpdate() > 0;
        }
    }

    // delete a contact
    public boolean deleteContact(Long id) throws SQLException {
        String sql = "DELETE FROM contacts WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(dbUrl);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setLong(1, id);
            return pstmt.executeUpdate() > 0;
        }
    }
}
