package com.example.taller_mecanico;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.taller_mecanico.model.Vehiculo;
import com.example.taller_mecanico.network.ApiClient;
import com.example.taller_mecanico.network.ApiService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UpdateVehicleActivity extends AppCompatActivity {

    private EditText editTextMarca, editTextModelo, editTextAnio, editTextPlaca, editTextCliente;
    private Button buttonActualizar;
    private int vehiculoId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_vehicle);

        editTextMarca = findViewById(R.id.editTextMarca);
        editTextModelo = findViewById(R.id.editTextModelo);
        editTextAnio = findViewById(R.id.editTextAnio);
        editTextPlaca = findViewById(R.id.editTextPlaca);
        editTextCliente = findViewById(R.id.editTextCliente);
        buttonActualizar = findViewById(R.id.buttonActualizar);

        // Obtener datos del Intent
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            vehiculoId = extras.getInt("id");
            editTextMarca.setText(extras.getString("marca"));
            editTextModelo.setText(extras.getString("modelo"));
            editTextAnio.setText(String.valueOf(extras.getInt("anio")));
            editTextPlaca.setText(extras.getString("placa"));
            editTextCliente.setText(extras.getString("cliente"));
        }

        buttonActualizar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String marca = editTextMarca.getText().toString();
                String modelo = editTextModelo.getText().toString();
                int anio = Integer.parseInt(editTextAnio.getText().toString());
                String placa = editTextPlaca.getText().toString();
                String cliente = editTextCliente.getText().toString();

                Vehiculo vehiculo = new Vehiculo(vehiculoId, marca, modelo, anio, placa, cliente);

                ApiService apiService = ApiClient.getClient().create(ApiService.class);
                Call<Vehiculo> call = apiService.updateVehiculo(vehiculoId, vehiculo);

                call.enqueue(new Callback<Vehiculo>() {
                    @Override
                    public void onResponse(Call<Vehiculo> call, Response<Vehiculo> response) {
                        if (response.isSuccessful()) {
                            Toast.makeText(UpdateVehicleActivity.this, "Vehículo actualizado con éxito", Toast.LENGTH_SHORT).show();
                            finish();
                        } else {
                            Toast.makeText(UpdateVehicleActivity.this, "Error al actualizar el vehículo", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<Vehiculo> call, Throwable t) {
                        Toast.makeText(UpdateVehicleActivity.this, "Error de red: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }
}
