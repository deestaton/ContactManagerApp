package org.aphelion.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;


@Configuration
public class DatabaseConfig {
    private static final String DB_URL = "jdbc:sqlite:contact.db";

    @PostConstruct
    public void initialize() {
        createNewDatabase();
        createTables();
    }

    private void createNewDatabase() {
        try (Connection conn = DriverManager.getConnection(DB_URL)) {
            if (conn != null) {
                System.out.println("A new database has been created.");
            }
        } catch (SQLException e) {
            System.out.println("Error creating database: " + e.getMessage());
        }
    }

    public void createTables() {
        String createContactsTable = """
                CREATE TABLE IF NOT EXISTS contacts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    email TEXT UNIQUE,
                    phone TEXT,
                    address TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """;

        try (Connection conn = DriverManager.getConnection(DB_URL);
             Statement stmt = conn.createStatement()) {
            stmt.execute(createContactsTable);
            System.out.println("Tables created successfully");
        } catch (SQLException e) {
            System.out.println("Error creating tables: " + e.getMessage());
        }
    }

    @Bean
    public String databaseUrl() {
        return DB_URL;
    }
}
//
//        String createGroupsTable = """
//            CREATE TABLE IF NOT EXISTS groups (
//                id INTEGER PRIMARY KEY AUTOINCREMENT,
//                name TEXT NOT NULL UNIQUE,
//                description TEXT
//            )
//        """;
//
//        String createContactGroupsTable = """
//            CREATE TABLE IF NOT EXISTS contact_groups (
//                contact_id INTEGER,
//                group_id INTEGER,
//                FOREIGN KEY (contact_id) REFERENCES contacts (id),
//                FOREIGN KEY (group_id) REFERENCES groups (id),
//                PRIMARY KEY (contact_id, group_id)
//            )
//        """;
//
//        // try-with-resources version of try/catch
//        try (Connection conn = DriverManager.getConnection(DB_URL);
//            Statement stmt = conn.createStatement()) {
//                // create tables
//                stmt.execute(createContactsTable);
//                stmt.execute(createGroupsTable);
//                stmt.execute(createContactGroupsTable);
//
//                System.out.println("Tables created successfully");
//        } catch (SQLException e) {
//            System.out.println("Error creating tables: " + e.getMessage());
//        }

