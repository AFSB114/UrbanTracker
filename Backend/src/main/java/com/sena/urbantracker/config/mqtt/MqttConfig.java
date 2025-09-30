package com.sena.urbantracker.config.mqtt;

import org.springframework.beans.factory.annotation.Value;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.MessagingGateway;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;

@Configuration
public class MqttConfig {

     //  Propiedades desde application.properties

    @Value("${mqtt.broker-url}") private String brokerUrl;
    @Value("${mqtt.client-id}") private String clientId;
    @Value("${mqtt.username}") private String username;
    @Value("${mqtt.password}") private String password;

    @Value("${mqtt.clean-session}") private boolean cleanSession;
    @Value("${mqtt.automatic-reconnect}") private boolean automaticReconnect;
    @Value("${mqtt.connection-timeout}") private int connectionTimeout;
    @Value("${mqtt.keep-alive-interval}") private int keepAliveInterval;

    @Value("${mqtt.topic.subscribe}") private String subscribeTopic;
    @Value("${mqtt.topic.publish}") private String publishTopic;
    @Value("${mqtt.qos}") private int qos;

    // Canal para mensajes entrantes
    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    // Canal para publicaciones
    @Bean
    public MessageChannel mqttOutboundChannel() {
        return new DirectChannel();
    }

    // Opciones de conexión
    @Bean
    public MqttConnectOptions mqttConnectOptions() {
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[]{brokerUrl});

        if (username != null && !username.isBlank()) {
            options.setUserName(username);
        }
        if (password != null && !password.isBlank()) {
            options.setPassword(password.toCharArray());
        }

        options.setCleanSession(cleanSession);
        options.setAutomaticReconnect(automaticReconnect);
        options.setConnectionTimeout(connectionTimeout);
        options.setKeepAliveInterval(keepAliveInterval);

        return options;
    }

    // Cliente MQTT factory
    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        factory.setConnectionOptions(mqttConnectOptions());
        return factory;
    }

    // Suscriptor (Inbound)
    @Bean
    public MqttPahoMessageDrivenChannelAdapter inbound() {
        MqttPahoMessageDrivenChannelAdapter adapter =
                new MqttPahoMessageDrivenChannelAdapter(
                        clientId + "-sub", mqttClientFactory(), subscribeTopic
                );
        adapter.setCompletionTimeout(5000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(qos);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }

    // Publicador (Outbound)
    @Bean
    @ServiceActivator(inputChannel = "mqttOutboundChannel")
    public MessageHandler mqttOutbound() {
        MqttPahoMessageHandler handler =
                new MqttPahoMessageHandler(clientId + "-pub", mqttClientFactory());
        handler.setAsync(true);
        handler.setDefaultTopic(publishTopic);
        handler.setDefaultQos(qos);
        return handler;
    }

    // Gateway para publicar fácilmente desde servicios
    @MessagingGateway(defaultRequestChannel = "mqttOutboundChannel")
    public interface MqttGateway {
        void sendToMqtt(String data);
    }
}
