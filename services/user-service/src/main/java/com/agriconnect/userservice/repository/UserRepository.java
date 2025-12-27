package com.agriconnect.userservice.repository;

import com.agriconnect.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByUserType(User.UserType userType);
    
    List<User> findByIsActiveTrue();
    
    @Query("SELECT u FROM User u WHERE u.userType = :userType AND u.isActive = true")
    List<User> findActiveUsersByType(@Param("userType") User.UserType userType);
    
    @Query("SELECT u FROM User u JOIN u.profile p WHERE p.location = :location AND u.userType = :userType")
    List<User> findByLocationAndUserType(@Param("location") String location, @Param("userType") User.UserType userType);
}
