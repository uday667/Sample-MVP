package com.agriconnect.userservice.service;

import com.agriconnect.userservice.dto.UserRegistrationRequest;
import com.agriconnect.userservice.dto.UserResponse;
import com.agriconnect.userservice.model.User;
import com.agriconnect.userservice.model.UserProfile;
import com.agriconnect.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserResponse registerUser(UserRegistrationRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());
        
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User with email " + request.getEmail() + " already exists");
        }
        
        // Create user entity
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setUserType(request.getUserType());
        user.setIsActive(true);
        
        // Save user
        User savedUser = userRepository.save(user);
        
        // Create user profile
        UserProfile profile = new UserProfile();
        profile.setUser(savedUser);
        profile.setBio(request.getBio());
        profile.setLocation(request.getLocation());
        profile.setSkills(request.getSkills());
        profile.setExperienceYears(request.getExperienceYears());
        if (request.getHourlyRate() != null) {
            profile.setHourlyRate(BigDecimal.valueOf(request.getHourlyRate()));
        }
        profile.setAvailabilityStatus(UserProfile.AvailabilityStatus.AVAILABLE);
        
        savedUser.setProfile(profile);
        userRepository.save(savedUser);
        
        
        log.info("User registered successfully with ID: {}", savedUser.getId());
        return mapToUserResponse(savedUser);
    }
    
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        return mapToUserResponse(user);
    }
    
    @Transactional(readOnly = true)
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return mapToUserResponse(user);
    }
    
    @Transactional(readOnly = true)
    public List<UserResponse> getUsersByType(User.UserType userType) {
        List<User> users = userRepository.findActiveUsersByType(userType);
        return users.stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<UserResponse> getUsersByLocationAndType(String location, User.UserType userType) {
        List<User> users = userRepository.findByLocationAndUserType(location, userType);
        return users.stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }
    
    public UserResponse updateUserProfile(Long userId, UserRegistrationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        
        // Update user basic info
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        
        // Update profile
        UserProfile profile = user.getProfile();
        if (profile == null) {
            profile = new UserProfile();
            profile.setUser(user);
        }
        
        profile.setBio(request.getBio());
        profile.setLocation(request.getLocation());
        profile.setSkills(request.getSkills());
        profile.setExperienceYears(request.getExperienceYears());
        if (request.getHourlyRate() != null) {
            profile.setHourlyRate(BigDecimal.valueOf(request.getHourlyRate()));
        }
        
        user.setProfile(profile);
        User savedUser = userRepository.save(user);
        
        
        return mapToUserResponse(savedUser);
    }
    
    public void deactivateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        
        user.setIsActive(false);
        userRepository.save(user);
        
    }
    
    private UserResponse mapToUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setPhone(user.getPhone());
        response.setUserType(user.getUserType());
        response.setIsActive(user.getIsActive());
        response.setCreatedAt(user.getCreatedAt());
        
        // Map profile information
        if (user.getProfile() != null) {
            UserProfile profile = user.getProfile();
            response.setBio(profile.getBio());
            response.setLocation(profile.getLocation());
            response.setSkills(profile.getSkills());
            response.setExperienceYears(profile.getExperienceYears());
            if (profile.getHourlyRate() != null) {
                response.setHourlyRate(profile.getHourlyRate().doubleValue());
            }
            response.setAvailabilityStatus(profile.getAvailabilityStatus());
            response.setProfileImageUrl(profile.getProfileImageUrl());
        }
        
        return response;
    }
}
