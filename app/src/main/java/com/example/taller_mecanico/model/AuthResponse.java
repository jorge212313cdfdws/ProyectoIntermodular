package com.example.taller_mecanico.model;

public class AuthResponse {
    private String message;
    private String token;
    private String email;
    private String role;
    private long id;
    private String nombreCompleto;

    public String getMessage() { return message; }
    public String getToken() { return token; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public long getId() { return id; }
    public String getNombreCompleto() { return nombreCompleto; }
}
