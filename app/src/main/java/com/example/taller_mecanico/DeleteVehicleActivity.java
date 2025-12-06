package com.example.taller_mecanico;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.taller_mecanico.network.ApiClient;
import com.example.taller_mecanico.network.ApiService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DeleteVehicleActivity extends AppCompatActivity {

    private Button buttonEliminar;
    private int vehiculoId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_delete_vehicle);

        buttonEliminar = findViewById(R.id.buttonEliminar);

        // Obtener datos del Intent
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            vehiculoId = extras.getInt("id");
        }

        buttonEliminar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ApiService apiService = ApiClient.getClient().create(ApiService.class);
                Call<Void> call = apiService.deleteVehiculo(vehiculoId);

                call.enqueue(new Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, Response<Void> response) {
                        if (response.isSuccessful()) {
                            Toast.makeText(DeleteVehicleActivity.this, "Vehículo eliminado con éxito", Toast.LENGTH_SHORT).show();
                            finish();
                        } else {
                            Toast.makeText(DeleteVehicleActivity.this, "Error al eliminar el vehículo", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        Toast.makeText(DeleteVehicleActivity.this, "Error de red: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }
}
