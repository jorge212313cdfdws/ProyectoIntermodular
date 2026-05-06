package com.example.taller_mecanico.model;

public class Client {
    private long id;
    private String nombreCompleto;
    private String email;
    private String direccion;

    // Constructor
    public Client(long id, String nombreCompleto, String email, String direccion) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.direccion = direccion;
    }

    // Getters
    public long getId() {
        return id;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public String getEmail() {
        return email;
    }

    public String getDireccion() {
        return direccion;
    }
}
