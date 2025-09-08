package com.sena.urbantracker.security.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void emailRecoveryPassword(String addressMail, String name, String code) {
        try {
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
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                        
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        
                        .email-container {
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                            min-height: 100vh;
                            padding: 20px;
                        }
                        
                        .email-wrapper {
                            max-width: 600px;
                            margin: 0 auto;
                            background: #ffffff;
                            border-radius: 16px;
                            overflow: hidden;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                        }
                        
                        .header {
                            background: linear-gradient(135deg, #4f46e5 0%%, #7c3aed 100%%);
                            padding: 40px 30px;
                            text-align: center;
                            position: relative;
                        }
                        
                        .logo-container {
                            width: 80px;
                            height: 80px;
                            margin: 0 auto 20px;
                            background: rgba(255, 255, 255, 0.15);
                            border-radius: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            backdrop-filter: blur(10px);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                        }
                        
                        .logo-placeholder {
                            width: 50px;
                            height: 50px;
                            background: rgba(255, 255, 255, 0.2);
                            border-radius: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                            color: #ffffff;
                            font-weight: 600;
                        }
                        
                        .app-title {
                            color: #ffffff;
                            font-size: 28px;
                            font-weight: 700;
                            margin-bottom: 8px;
                            letter-spacing: -0.5px;
                        }
                        
                        .app-subtitle {
                            color: rgba(255, 255, 255, 0.8);
                            font-size: 16px;
                            font-weight: 400;
                        }
                        
                        .content {
                            padding: 50px 40px;
                        }
                        
                        .greeting {
                            color: #1f2937;
                            font-size: 24px;
                            font-weight: 600;
                            margin-bottom: 24px;
                        }
                        
                        .message {
                            color: #4b5563;
                            font-size: 16px;
                            line-height: 1.6;
                            margin-bottom: 32px;
                        }
                        
                        .code-container {
                            background: linear-gradient(135deg, #f8fafc 0%%, #e2e8f0 100%%);
                            border: 2px solid #e5e7eb;
                            border-radius: 12px;
                            padding: 30px;
                            text-align: center;
                            margin: 32px 0;
                            position: relative;
                        }
                        
                        .code-label {
                            color: #6b7280;
                            font-size: 14px;
                            font-weight: 500;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            margin-bottom: 12px;
                        }
                        
                        .verification-code {
                            font-size: 36px;
                            font-weight: 700;
                            color: #4f46e5;
                            letter-spacing: 8px;
                            font-family: 'Courier New', monospace;
                            background: linear-gradient(135deg, #4f46e5 0%%, #7c3aed 100%%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                        }
                        
                        .code-info {
                            margin-top: 20px;
                            padding: 16px;
                            background: rgba(249, 115, 22, 0.1);
                            border-radius: 8px;
                            border-left: 4px solid #f97316;
                        }
                        
                        .code-info-text {
                            color: #ea580c;
                            font-size: 14px;
                            font-weight: 500;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        }
                        
                        .warning-icon {
                            font-size: 16px;
                        }
                        
                        .security-notice {
                            background: #f0f9ff;
                            border: 1px solid #0ea5e9;
                            border-radius: 8px;
                            padding: 20px;
                            margin: 32px 0;
                        }
                        
                        .security-text {
                            color: #0c4a6e;
                            font-size: 14px;
                            line-height: 1.5;
                        }
                        
                        .footer {
                            background: #f9fafb;
                            padding: 30px 40px;
                            text-align: center;
                            border-top: 1px solid #e5e7eb;
                        }
                        
                        .footer-text {
                            color: #9ca3af;
                            font-size: 13px;
                            line-height: 1.5;
                        }
                        
                        .footer-link {
                            color: #4f46e5;
                            text-decoration: none;
                        }
                        
                        .transport-icons {
                            position: absolute;
                            top: 20px;
                            right: 30px;
                            opacity: 0.1;
                            font-size: 24px;
                            color: #ffffff;
                        }
                        
                        @media (max-width: 640px) {
                            .email-container {
                                padding: 10px;
                            }
                            
                            .content {
                                padding: 30px 20px;
                            }
                            
                            .verification-code {
                                font-size: 28px;
                                letter-spacing: 4px;
                            }
                            
                            .app-title {
                                font-size: 24px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="email-wrapper">
                            <!-- Header con logo y branding -->
                            <div class="header">
                                <div class="transport-icons">🚌🚇🚊</div>
                                
                                <!-- Contenedor para tu logo SVG -->
                                <div class="logo-container">
                                    <!-- Aquí insertas tu logo SVG negro -->
                                    <!-- Tu logo negro se verá perfecto sobre el fondo blanco -->
                                    <!-- Ejemplo: <svg width="60" height="60" viewBox="...">...</svg> -->
                                    
                                    <!-- Placeholder temporal (eliminar cuando agregues tu SVG) -->
                                    <div class="logo-placeholder">UT</div>
                                </div>
                                
                                <h1 class="app-title">UrbanTracker</h1>
                                <p class="app-subtitle">Sistema de Gestión de Rutas</p>
                            </div>
                            
                            <!-- Contenido principal -->
                            <div class="content">
                                <h2 class="greeting">¡Hola %s! 👋</h2>
                                
                                <p class="message">
                                    Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en UrbanTracker. 
                                    Para continuar con el proceso, utiliza el siguiente código de verificación:
                                </p>
                                
                                <!-- Código de verificación -->
                                <div class="code-container">
                                    <div class="code-label">Código de Verificación</div>
                                    <div class="verification-code">%s</div>
                                    
                                    <div class="code-info">
                                        <div class="code-info-text">
                                            <span class="warning-icon">⏰</span>
                                            Este código expira en <strong>20 minutos</strong>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Aviso de seguridad -->
                                <div class="security-notice">
                                    <p class="security-text">
                                        <strong>🔒 Aviso de Seguridad:</strong><br>
                                        Si no solicitaste este restablecimiento de contraseña, puedes ignorar este mensaje de forma segura. 
                                        Tu cuenta permanece protegida y no se realizarán cambios sin este código.
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Footer -->
                            <div class="footer">
                                <p class="footer-text">
                                    © 2025 <strong>UrbanTracker</strong> - Sistema de Gestión de Rutas de Transporte Público<br>
                                    Este es un mensaje automático, por favor no respondas a este correo.<br><br>
                                    <a href="#" class="footer-link">Política de Privacidad</a> • 
                                    <a href="#" class="footer-link">Términos de Uso</a> • 
                                    <a href="#" class="footer-link">Soporte Técnico</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
                """,
                    name, code);

            emailSender(addressMail, subject, bodyMail);
        } catch (Exception e) {
            System.out.println("Error al enviar el correo de recuperación: " + e.getMessage());
        }
    }

    public boolean emailSender(String addresMail, String subject, String bodyMail) throws MessagingException {
        try {
            // Creación del correo
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(addresMail);
            helper.setSubject(subject);
            helper.setText(bodyMail, true);
            javaMailSender.send(message);
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

}
