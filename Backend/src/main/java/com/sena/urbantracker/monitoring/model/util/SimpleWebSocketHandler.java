package com.sena.urbantracker.monitoring.model.util;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SimpleWebSocketHandler extends TextWebSocketHandler {

    // Lista de sesiones conectadas
    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();

    // Cuando alguien se conecta
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("Cliente conectado: " + session.getId());
    }

    // Cuando llega un mensaje
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String msg = message.getPayload();
        System.out.println("Mensaje recibido: " + msg);

        // Echo: devolver el mismo mensaje
        session.sendMessage(new TextMessage("Echo: " + msg));

        // O broadcast: enviar a todos
        // broadcastMessage("Broadcast: " + msg);
    }

    // Cuando alguien se desconecta
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("Cliente desconectado: " + session.getId());
    }

    // Método para enviar a todos
    private void broadcastMessage(String message) {
        for (WebSocketSession session : sessions) {
            try {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                }
            } catch (Exception e) {
                System.err.println("Error enviando mensaje: " + e.getMessage());
            }
        }
    }
}