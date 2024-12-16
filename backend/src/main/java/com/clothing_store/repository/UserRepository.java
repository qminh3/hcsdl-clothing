package com.clothing_store.repository;

import com.clothing_store.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Tạo phương thức để tìm kiếm người dùng bằng email

    // Gọi function CheckUserExists
    @Query(value = "SELECT CheckUserExists(:inputEmail, :inputPassword)", nativeQuery = true)
    Boolean checkUserExists(@Param("inputEmail") String email, @Param("inputPassword") String password);

    @Procedure(procedureName = "Insertuser")
    String insertUser(
            @Param("p_first_name") String firstName,
            @Param("p_last_name") String lastName,
            @Param("p_phone_number") String phoneNumber,
            @Param("p_password") String password,
            @Param("p_email") String email
    );

    @Procedure(procedureName = "Updateuser")
    void updateUser(
            @Param("p_user_id") String userId,
            @Param("p_phone_number") String phoneNumber,
            @Param("p_password") String password,
            @Param("p_email") String email
    );

    @Procedure(procedureName = "Deleteuser")
    void deleteUser(@Param("p_user_id") String userId);

    @Procedure(procedureName = "GetUserById")
    User getUserById(@Param("p_user_id") String userId);

    @Procedure(procedureName = "GetAllUsers")
    List<User> getAllUsers();
}
