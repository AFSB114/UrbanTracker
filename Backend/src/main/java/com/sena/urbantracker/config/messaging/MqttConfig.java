package com.sena.urbantracker.config.messaging;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * MQTT configuration for connecting to a Mosquitto broker.

 * Exposes two beans:
 * - MqttConnectOptions (configured from application.properties)
 * - IMqttClient (connected client, auto-disconnects on shutdown)
 */
@Configuration
public class MqttConfig {

    @Value("${mqtt.broker-url}")
    private String brokerUrl;

    @Value("${mqtt.client-id}")
    private String clientId;

    @Value("${mqtt.username}")
    private String username;

    @Value("${mqtt.password}")
    private String password;

    @Value("${mqtt.clean-session}")
    private boolean cleanSession;

    @Value("${mqtt.automatic-reconnect}")
    private boolean automaticReconnect;

    @Value("${mqtt.connection-timeout}")
    private int connectionTimeout;

    @Value("${mqtt.keep-alive-interval}")
    private int keepAliveInterval;

    @Bean
    public MqttConnectOptions mqttConnectOptions() {
        MqttConnectOptions options = new MqttConnectOptions();
        options.setCleanSession(cleanSession);
        options.setAutomaticReconnect(automaticReconnect);
        options.setConnectionTimeout(connectionTimeout);
        options.setKeepAliveInterval(keepAliveInterval);

        if (username != null && !username.isBlank()) {
            options.setUserName(username);
        }
        if (password != null && !password.isBlank()) {
            options.setPassword(password.toCharArray());
        }
        return options;
    }

    /**
     * Creates and connects a singleton MQTT client instance.
     * The bean will disconnect automatically when the context closes.
     */
    @Bean(destroyMethod = "disconnect")
    public IMqttClient mqttClient(MqttConnectOptions options) throws MqttException {
        // Ensure a unique client ID if multiple instances of the app might run
        String effectiveClientId = clientId + "-" + java.util.UUID.randomUUID();
        IMqttClient client = new MqttClient(brokerUrl, effectiveClientId);
        if (!client.isConnected()) {
            client.connect(options);
        }
        return client;
    }
}
