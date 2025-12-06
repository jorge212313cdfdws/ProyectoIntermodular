package com.example.taller_mecanico;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    Button btnVerClientes, btnAnadirCliente;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnVerClientes = findViewById(R.id.btnVerClientes);
        btnAnadirCliente = findViewById(R.id.btnAnadirCliente);

        btnVerClientes.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Lanzará ReadClientsActivity (la crearemos a continuación)
                Intent intent = new Intent(MainActivity.this, ReadClientsActivity.class);
                startActivity(intent);
            }
        });

        btnAnadirCliente.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Lanzará CreateClientActivity (la crearemos a continuación)
                Intent intent = new Intent(MainActivity.this, CreateClientActivity.class);
                startActivity(intent);
            }
        });
    }
}
