package com.taller.util; 

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;

public class HttpStatusMessages {

    private static final Map<Integer, String> messages = new HashMap<>();

    static {
        messages.put(HttpStatus.OK.value(), "OK: Operación completada con éxito.");
        messages.put(HttpStatus.CREATED.value(), "CREATED: Recurso creado correctamente.");
        messages.put(HttpStatus.BAD_REQUEST.value(), "BAD REQUEST: Solicitud incorrecta.");
        messages.put(HttpStatus.UNAUTHORIZED.value(), "UNAUTHORIZED: No autorizado.");
        messages.put(HttpStatus.FORBIDDEN.value(), "FORBIDDEN: Acceso prohibido.");
        messages.put(HttpStatus.NOT_FOUND.value(), "NOT FOUND: Recurso no encontrado.");
        messages.put(HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL SERVER ERROR: Error en el servidor.");
        messages.put(HttpStatus.CONFLICT.value(), "CONFLICT: Conflicto al crear el recurso.");
    }

    public static String getMessage(int code) {
        return messages.getOrDefault(code, "Código HTTP desconocido");
    }
}
