package com.clothing_store.controller;

import com.clothing_store.dto.request.Login;
import com.clothing_store.dto.request.insert.UserRequest;
import com.clothing_store.dto.request.update.UserUpdateRequest;
import com.clothing_store.entity.user.User;
import com.clothing_store.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")

    @CrossOrigin
    public ResponseEntity<String> login(@RequestBody Login login) {
        boolean isUserValid = userService.login(login.getEmail(), login.getPassword());
        if (isUserValid) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }


    @PostMapping
    @CrossOrigin
    public ResponseEntity<String> createUser(@RequestBody UserRequest request) {
        try {
            userService.createUser(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully!");
        } catch (IllegalArgumentException e) {
            // Trả về lỗi 400 Bad Request
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // Trả về lỗi 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error: " + e.getMessage());
        }
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            if (users.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{userID}")
    @CrossOrigin
    public ResponseEntity<User> getUserById(@PathVariable String userID) {
        try {
            User user = userService.getUserById(userID);
            if (user != null) {
                return ResponseEntity.status(HttpStatus.OK).body(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{userID}")
    @CrossOrigin
    public ResponseEntity<String> updateUser(@PathVariable String userID,@RequestBody UserUpdateRequest request) {
        try {
            userService.updateUser(userID, request);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("User updated successfully!");
        } catch (IllegalArgumentException e) {
            // Trả về lỗi 400 Bad Request
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        } catch (Exception e) {
            // Trả về lỗi 500 Internal Server Error
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{userID}")
    @CrossOrigin
    ResponseEntity<String> deleteUser(@PathVariable String userID) {
        try {
            userService.deleteUser(userID);
            return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error: " + e.getMessage());
        }
    }
}
