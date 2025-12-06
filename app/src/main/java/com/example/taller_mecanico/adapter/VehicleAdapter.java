package com.example.taller_mecanico.adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.taller_mecanico.DeleteVehicleActivity;
import com.example.taller_mecanico.R;
import com.example.taller_mecanico.UpdateVehicleActivity;
import com.example.taller_mecanico.model.Vehiculo;

import java.util.List;

public class VehicleAdapter extends RecyclerView.Adapter<VehicleAdapter.VehicleViewHolder> {

    private List<Vehiculo> vehiculos;
    private Context context;

    public VehicleAdapter(Context context, List<Vehiculo> vehiculos) {
        this.context = context;
        this.vehiculos = vehiculos;
    }

    @NonNull
    @Override
    public VehicleViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.vehicle_item, parent, false);
        return new VehicleViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull VehicleViewHolder holder, int position) {
        Vehiculo vehiculo = vehiculos.get(position);
        holder.textViewMarcaModelo.setText(vehiculo.getMarca() + " " + vehiculo.getModelo());
        holder.textViewPlaca.setText("Placa: " + vehiculo.getPlaca());
        holder.textViewCliente.setText("Cliente: " + vehiculo.getCliente());

        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, UpdateVehicleActivity.class);
            intent.putExtra("id", vehiculo.getId());
            intent.putExtra("marca", vehiculo.getMarca());
            intent.putExtra("modelo", vehiculo.getModelo());
            intent.putExtra("anio", vehiculo.getAnio());
            intent.putExtra("placa", vehiculo.getPlaca());
            intent.putExtra("cliente", vehiculo.getCliente());
            context.startActivity(intent);
        });

        holder.itemView.setOnLongClickListener(v -> {
            Intent intent = new Intent(context, DeleteVehicleActivity.class);
            intent.putExtra("id", vehiculo.getId());
            context.startActivity(intent);
            return true;
        });
    }

    @Override
    public int getItemCount() {
        return vehiculos.size();
    }

    public static class VehicleViewHolder extends RecyclerView.ViewHolder {
        TextView textViewMarcaModelo, textViewPlaca, textViewCliente;

        public VehicleViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewMarcaModelo = itemView.findViewById(R.id.textViewMarcaModelo);
            textViewPlaca = itemView.findViewById(R.id.textViewPlaca);
            textViewCliente = itemView.findViewById(R.id.textViewCliente);
        }
    }
}
