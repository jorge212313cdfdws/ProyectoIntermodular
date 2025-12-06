package com.example.taller_mecanico;

import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.taller_mecanico.adapter.VehicleAdapter;
import com.example.taller_mecanico.model.Vehiculo;
import com.example.taller_mecanico.network.ApiClient;
import com.example.taller_mecanico.network.ApiService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReadVehiclesActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private VehicleAdapter adapter;
    private List<Vehiculo> vehiculos = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_read_vehicles);

        recyclerView = findViewById(R.id.recyclerViewVehicles);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new VehicleAdapter(this, vehiculos);
        recyclerView.setAdapter(adapter);
    }

    @Override
    protected void onResume() {
        super.onResume();
        fetchVehicles();
    }

    private void fetchVehicles() {
        ApiService apiService = ApiClient.getClient().create(ApiService.class);
        Call<List<Vehiculo>> call = apiService.getVehiculos();

        call.enqueue(new Callback<List<Vehiculo>>() {
            @Override
            public void onResponse(Call<List<Vehiculo>> call, Response<List<Vehiculo>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    vehiculos.clear();
                    vehiculos.addAll(response.body());
                    adapter.notifyDataSetChanged();
                } else {
                    Toast.makeText(ReadVehiclesActivity.this, "Error al obtener los vehículos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Vehiculo>> call, Throwable t) {
                Toast.makeText(ReadVehiclesActivity.this, "Error de red: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
