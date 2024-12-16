package com.clothing_store.service;

import com.clothing_store.dto.request.insert.UserRequest;
import com.clothing_store.dto.request.update.UserUpdateRequest;
import com.clothing_store.entity.user.User;
import com.clothing_store.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    protected UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public boolean login(String email, String password) {
        Boolean userExists = userRepository.checkUserExists(email, password);
        return userExists != null && userExists; // Trả về true nếu user tồn tại
    }



    @Transactional
    public void createUser(UserRequest request) {
        try {
            userRepository.insertUser(
                    request.getFirstName(),
                    request.getLastName(),
                    request.getPhoneNumber(),
                    request.getPassword(),
                    request.getEmail()
            );
        } catch (DataAccessException e) {
            // Xử lý lỗi từ Stored Procedure
            if (e.getMessage().contains("Email không hợp lệ")) {
                throw new IllegalArgumentException("Email không hợp lệ");
            } else if (e.getMessage().contains("Email đã được sử dụng")) {
                throw new IllegalArgumentException("Email đã được sử dụng");
            } else if (e.getMessage().contains("Số điện thoại đã được sử dụng")) {
                throw new IllegalArgumentException("Số điện thoại đã được sử dụng");
            } else {
                throw new RuntimeException("Lỗi không xác định từ database: " + e.getMessage());
            }
        }
    }

    @Transactional
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    @Transactional
    public User getUserById(String userId) {
        return userRepository.getUserById(userId);
    }

    @Transactional
    public void updateUser(String userId, UserUpdateRequest request) {
        try {
            userRepository.updateUser(
                    userId,
                    request.getPhoneNumber(),
                    request.getPassword(),
                    request.getEmail()
            );
        } catch (DataAccessException e) {
            // Xử lý lỗi từ Stored Procedure
            if (e.getMessage().contains("Email không hợp lệ")) {
                throw new IllegalArgumentException("Email không hợp lệ");
            } else if (e.getMessage().contains("user_id không tồn tại")) {
                throw new IllegalArgumentException("user_id không tồn tại");
            } else if (e.getMessage().contains("Email đã được sử dụng")) {
                throw new IllegalArgumentException("Email đã được sử dụng");
            } else if (e.getMessage().contains("Số điện thoại đã được sử dụng")) {
                throw new IllegalArgumentException("Số điện thoại đã được sử dụng");
            } else {
                throw new RuntimeException("Lỗi không xác định từ database: " + e.getMessage());
            }
        }
    }

    public void updateUser(String userID, User updatedUser) {
        User user = this.getUserById(userID);

        user.setPassword(updatedUser.getPassword());
        user.setEmail(updatedUser.getEmail());
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPhoneNumber(updatedUser.getPhoneNumber());

        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String userId) {
        try {
            userRepository.deleteUser(userId);
        } catch (DataAccessException e) {
            // Xử lý lỗi nếu Stored Procedure trả về thông báo lỗi
            if (e.getMessage().contains("user_id không tồn tại")) {
                throw new IllegalArgumentException("user_id không tồn tại");
            } else {
                throw new RuntimeException("Lỗi không xác định từ database: " + e.getMessage());
            }
        }
    }
}
