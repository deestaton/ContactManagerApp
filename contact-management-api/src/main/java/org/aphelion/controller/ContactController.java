package org.aphelion.controller;

import org.aphelion.model.Contact;
import org.aphelion.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:3000") // The React side will run on port 3000
public class ContactController {
    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<?> createContact(@RequestBody Contact contact) {
        try {
            Contact created = contactService.createContact(contact);
            return ResponseEntity.ok(created);
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getContactById(@PathVariable Long id) {
        try {
            return contactService.getContactById((id))
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllContacts() {
        try {
            List<Contact> contacts = contactService.getAllContacts();
            return ResponseEntity.ok(contacts);
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable Long id, @RequestBody Contact contact) {
        try {
            contact.setId(id);
            boolean updated = contactService.updateContact(contact);
            if (updated) {
                return ResponseEntity.ok(contact);
            }
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        try {
            boolean deleted = contactService.deleteContact(id);
            if (deleted) {
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
