package org.aphelion.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
}


//public class Contact {
//    private Long id;
//    private String firstName;
//    private String lastName;
//    private String email;
//    private String phone;
//    private String address;
//
//    // constructor with ID (for retrieving from db)
//    public Contact(Long id, String firstName, String lastName, String email, String phone, String address) {
//        this.id = id;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.phone = phone;
//        this.address = address;
//    }
//
//    // constructor without ID (for creating new contacts)
//    public Contact(String firstName, String lastName, String email, String phone, String address) {
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.phone = phone;
//        this.address = address;
//    }
//
//    // getters and setters
//    public Long getId() {
//        return id;
//    }
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//    public void setAddress(String address) {
//        this.address = address;
//    }
//}
