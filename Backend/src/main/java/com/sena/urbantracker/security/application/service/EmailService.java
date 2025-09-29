package com.sena.urbantracker.security.application.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void emailRecoveryPassword(String addressMail, String name, String code) throws Exception {
        String subject = "🔐 Recuperación de contraseña - UrbanTracker";
        String bodyMail = String.format(
                """
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Recuperación de Contraseña - UrbanTracker</title>
                    <style>
                        body {
                            font-family: Arial, Helvetica, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f6f9;
                        }
                        .email-wrapper {
                            max-width: 600px;
                            margin: 20px auto;
                            background: #ffffff;
                            border-radius: 12px;
                            border: 1px solid #e5e7eb;
                            overflow: hidden;
                        }
                        .header {
                            background: #1e293b;
                            padding: 30px;
                            text-align: center;
                        }
                        .app-title {
                            color: #ffffff;
                            font-size: 24px;
                            font-weight: bold;
                            margin: 0;
                        }
                        .content {
                            padding: 40px 30px;
                            color: #374151;
                            font-size: 15px;
                            line-height: 1.6;
                        }
                        .greeting {
                            font-size: 20px;
                            font-weight: bold;
                            margin-bottom: 20px;
                            color: #111827;
                        }
                        .verification-code {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: #1d4ed8;
                            color: #ffffff;
                            font-size: 28px;
                            font-weight: bold;
                            padding: 12px 24px;
                            border-radius: 8px;
                            margin: 20px auto;
                            letter-spacing: 6px;
                            text-align: center;
                            width: fit-content;
                        }
                        .code-info {
                            font-size: 13px;
                            color: #b45309;
                            margin-top: 10px;
                            padding: 10px;
                            background: #fff7ed;
                            border-left: 4px solid #f59e0b;
                            border-radius: 6px;
                        }
                        .security-notice {
                            margin-top: 30px;
                            font-size: 13px;
                            color: #0c4a6e;
                            padding: 15px;
                            border: 1px solid #0ea5e9;
                            border-radius: 8px;
                            background: #f0f9ff;
                        }
                        .footer {
                            background: #f9fafb;
                            padding: 20px;
                            text-align: center;
                            font-size: 12px;
                            color: #6b7280;
                            border-top: 1px solid #e5e7eb;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-wrapper">
                        <!-- Header -->
                        <div class="header">
                            <h1 class="app-title">UrbanTracker</h1>
                        </div>

                        <!-- Content -->
                        <div class="content">
                            <p class="greeting">¡Hola %s!</p>
                            <p>Hemos recibido una solicitud para restablecer tu contraseña en <strong>UrbanTracker</strong>.
                            Usa el siguiente código de verificación para continuar:</p>

                            <!-- Verification Code -->
                            <div class="verification-code">%s</div>

                            <div class="code-info">Este código expira en <strong>20 minutos</strong></div>

                            <div class="security-notice">
                                <strong>Aviso de seguridad:</strong>
                                Si no solicitaste este cambio, puedes ignorar este correo.
                                Tu cuenta sigue protegida y no se realizará ninguna modificación sin este código.
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="footer">
                            © 2025 <strong>UrbanTracker</strong> · Sistema de Gestión de Rutas
                            <br>Este mensaje es automático, no respondas a este correo.
                        </div>
                    </div>
                </body>
                </html>
                """,
                name, code
        );

        // Envías el correo usando tu método normal
        emailSender(addressMail, subject, bodyMail);
    }

    public void emailSender(String addresMail, String subject, String bodyMail) throws MessagingException {
        // Creación del correo
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(addresMail);
        helper.setSubject(subject);
        helper.setText(bodyMail, true);
        javaMailSender.send(message);
    }

}
