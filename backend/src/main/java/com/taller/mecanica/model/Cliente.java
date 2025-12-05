package com.taller.mecanica.model;

import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreCompleto;
    private String email;
    private String direccion;

    // Relación con Vehiculo
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Vehiculo> vehiculos = new ArrayList<>();

    // Colección de teléfonos
    @ElementCollection
    @CollectionTable(
        name = "cliente_telefonos",
        joinColumns = @JoinColumn(name = "cliente_id")
    )
    private Set<String> telefonos = new HashSet<>();
}
