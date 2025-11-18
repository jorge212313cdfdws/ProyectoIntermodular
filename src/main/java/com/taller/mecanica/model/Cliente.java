package com.taller.mecanica.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; 
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private long id; 

    @Column (nullable = false)
    private String nombre; 

    
}
