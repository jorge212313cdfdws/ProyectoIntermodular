package com.example.taller_mecanico.network;

import com.example.taller_mecanico.model.Vehiculo;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface ApiService {

    @GET("vehiculos")
    Call<List<Vehiculo>> getVehiculos();

    @POST("vehiculos")
    Call<Vehiculo> createVehiculo(@Body Vehiculo vehiculo);

    @PUT("vehiculos/{id}")
    Call<Vehiculo> updateVehiculo(@Path("id") int id, @Body Vehiculo vehiculo);

    @DELETE("vehiculos/{id}")
    Call<Void> deleteVehiculo(@Path("id") int id);
}
