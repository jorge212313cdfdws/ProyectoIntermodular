package com.example.taller_mecanico.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.taller_mecanico.R;
import com.example.taller_mecanico.model.Client;
import java.util.List;

public class ClientAdapter extends RecyclerView.Adapter<ClientAdapter.ClientViewHolder> {

    private List<Client> clientList;
    private OnItemClickListener listener;

    // Interface con métodos específicos para cada acción
    public interface OnItemClickListener {
        void onEditClick(Client client);
        void onDeleteClick(Client client);
    }

    public ClientAdapter(List<Client> clientList, OnItemClickListener listener) {
        this.clientList = clientList;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ClientViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.client_item, parent, false);
        return new ClientViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull ClientViewHolder holder, int position) {
        Client currentClient = clientList.get(position);
        holder.textViewNombre.setText(currentClient.getNombreCompleto());
        holder.textViewEmail.setText(currentClient.getEmail());

        // Asigna los listeners a los iconos
        holder.iconEdit.setOnClickListener(v -> listener.onEditClick(currentClient));
        holder.iconDelete.setOnClickListener(v -> listener.onDeleteClick(currentClient));
    }

    @Override
    public int getItemCount() {
        return clientList.size();
    }

    static class ClientViewHolder extends RecyclerView.ViewHolder {
        TextView textViewNombre;
        TextView textViewEmail;
        ImageView iconEdit;
        ImageView iconDelete;

        public ClientViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewNombre = itemView.findViewById(R.id.textViewNombre);
            textViewEmail = itemView.findViewById(R.id.textViewEmail);
            iconEdit = itemView.findViewById(R.id.icon_edit);
            iconDelete = itemView.findViewById(R.id.icon_delete);
        }
    }
}
