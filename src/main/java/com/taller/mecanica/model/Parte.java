package com.taller.mecanica.model;

//imports
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Parte {

    @Id
    @GeneratedValue
    private long id_parte; 

    @Column (nullable = false)
    private String nombre; 
    
    @Column (nullable = false)
    private String descripcion;
    
    @Column (nullable = false)
    private double precio; 
    
    @Column (nullable = false)
    private int stock; 
    
    
    
    
}
