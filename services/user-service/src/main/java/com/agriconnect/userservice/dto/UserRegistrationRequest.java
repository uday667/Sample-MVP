package com.agriconnect.userservice.dto;

import com.agriconnect.userservice.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class UserRegistrationRequest {
    
    @Email
    @NotBlank
    private String email;
    
    @NotBlank
    private String password;
    
    @NotBlank
    private String firstName;
    
    @NotBlank
    private String lastName;
    
    private String phone;
    
    @NotNull
    private User.UserType userType;
    
    private String bio;
    
    private String location;
    
    private List<String> skills;
    
    private Integer experienceYears;
    
    private Double hourlyRate;
}
