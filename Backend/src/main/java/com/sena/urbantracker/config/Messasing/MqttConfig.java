package com.sena.urbantracker.config.Messasing;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;

@Configuration
public class MqttConfig {

    @Value("${mqtt.broker.url}")
    private String brokerUrl;

    @Value("${mqtt.client.id}")
    private String clientId;

    @Value("${mqtt.username}")
    private String username;

    @Value("${mqtt.password}")
    private String password;

    @Value("${mqtt.topic.subscribe}")
    private String defaultSubscribeTopic;

    @Value("${mqtt.topic.publish}")
    private String defaultPublishTopic;

    @Value("${mqtt.qos:1}")
    private int qos;

    @Value("${mqtt.connection.timeout}")
    private int connectionTimeout;

    @Value("${mqtt.keep.alive.interval}")
    private int keepAliveInterval;

    @Value("${mqtt.clean.session}")
    private boolean cleanSession;

    @Value("${mqtt.auto.reconnect}")
    private boolean automaticReconnect;

    /**
     * Configuración del cliente MQTT
     */
    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();

        // Configuración básica
        options.setServerURIs(new String[]{brokerUrl});
        options.setConnectionTimeout(connectionTimeout);
        options.setKeepAliveInterval(keepAliveInterval);
        options.setCleanSession(cleanSession);
        options.setAutomaticReconnect(automaticReconnect);

        // Autenticación (si es necesaria)
        if (!username.isEmpty()) {
            options.setUserName(username);
        }
        if (!password.isEmpty()) {
            options.setPassword(password.toCharArray());
        }

        factory.setConnectionOptions(options);
        return factory;
    }

    /**
     * Canal para mensajes entrantes (suscripción)
     */
    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    /**
     * Canal para mensajes salientes (publicación)
     */
    @Bean
    public MessageChannel mqttOutboundChannel() {
        return new DirectChannel();
    }

    /**
     * Adaptador para recibir mensajes MQTT (Inbound)
     */
    @Bean
    public MessageProducer inbound() {
        MqttPahoMessageDrivenChannelAdapter adapter =
                new MqttPahoMessageDrivenChannelAdapter(
                        clientId + "-inbound",
                        mqttClientFactory(),
                        defaultSubscribeTopic
                );

        adapter.setCompletionTimeout(5000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(qos);
        adapter.setOutputChannel(mqttInputChannel());

        return adapter;
    }

    /**
     * Manejador para enviar mensajes MQTT (Outbound)
     */
    @Bean
    @ServiceActivator(inputChannel = "mqttOutboundChannel")
    public MessageHandler mqttOutbound() {
        MqttPahoMessageHandler messageHandler =
                new MqttPahoMessageHandler(
                        clientId + "-outbound",
                        mqttClientFactory()
                );

        messageHandler.setAsync(true);
        messageHandler.setDefaultTopic(defaultPublishTopic);
        messageHandler.setDefaultQos(qos);
        messageHandler.setDefaultRetained(false);

        return messageHandler;
    }

    /**
     * Manejador para procesar mensajes recibidos
     */
    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler handler() {
        return message -> {
            String topic = message.getHeaders().get("mqtt_receivedTopic").toString();
            String payload = message.getPayload().toString();

            System.out.println("Mensaje recibido en topic: " + topic);
            System.out.println("Payload: " + payload);

            // Aquí puedes agregar tu lógica de procesamiento
            // Por ejemplo, delegar a un servicio específico
        };
    }
}
