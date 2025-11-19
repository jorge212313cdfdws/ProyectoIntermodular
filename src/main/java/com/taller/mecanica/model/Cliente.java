package com.taller.mecanica.model;

//imports

//imports de java.util -> Listas dinámicas 
//imports de jakarta -> traducción de clases a tablas 
//imports de lombok -> generan constructor, getters y setters automaticamente 

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
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

    //atributos 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false )
    private String direccion; 

    //Listas:
    //Lista de teléfonos 
    @ElementCollection
    @CollectionTable(name = "telefonos_cliente", joinColumns = @JoinColumn(name = "cliente_id"))
    @Column(name = "telefono")
    private List<String> telefonos = new ArrayList<>(); 

    //Relaciones: 
    //Relacion de Vehículo (M:1)
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<Vehiculo> vehiculos = new ArrayList<>(); 

    //Relacion de OrdenDeTrabajo
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<OrdenDeTrabajo> ordenes = new ArrayList<>(); 
}
