package com.taller.mecanica.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Cliente")
public class ClienteController {
    
    @GetMapping
    public List<Cliente> listar() {

        return 
    } 
}
