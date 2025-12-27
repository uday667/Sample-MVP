package com.agriconnect.userservice.dto;

import com.agriconnect.userservice.model.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserResponse {
    
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private User.UserType userType;
    private Boolean isActive;
    private LocalDateTime createdAt;
    
    // Profile information
    private String bio;
    private String location;
    private List<String> skills;
    private Integer experienceYears;
    private Double hourlyRate;
    private UserProfile.AvailabilityStatus availabilityStatus;
    private String profileImageUrl;
    
    public static class UserProfile {
        public enum AvailabilityStatus {
            AVAILABLE, BUSY, UNAVAILABLE
        }
    }
}
