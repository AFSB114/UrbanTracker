package com.sena.urbantracker.config.init;


import com.sena.urbantracker.security.model.entity.Role;
import com.sena.urbantracker.security.model.entity.User;
import com.sena.urbantracker.security.repository.IRole;
import com.sena.urbantracker.security.repository.IUser;
import com.sena.urbantracker.users.model.entity.UserProfile;
import com.sena.urbantracker.users.repository.IUserProfile;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class DataInitializer implements CommandLineRunner {

    private final IRole Irole;
    private final IUser Iuser;
    private final PasswordEncoder passwordEncoder;
    private final IUserProfile IuserProfile;

    // Creo los roles al iniciar el proyecto
    @Override
    public void run(String... args) {

        // Verifico si el rol ADMIN existe en la base de datos,
        // si no existe, lo creo y lo guardo
        Role adminRole = Irole.findByName("ROLE_ADMIN")
                .orElseGet(() -> Irole.save(
                        Role.builder()
                                .name("ROLE_ADMIN")
                                .description("Tiene acceso completo al sistema")
                                .build()
                ));

        // Verifico si el rol DRIVER existe en la base de datos,
        // si no existe, lo creo y lo guardo
        Irole.findByName("ROLE_DRIVER")
                .orElseGet(() -> Irole.save(
                        Role.builder()
                                .name("ROLE_DRIVER")
                                .description("Usuario con permisos limitados a las funcionalidades de conductor")
                                .build()
                ));

        // Crear usuario ADMIN si no existe
        String adminUsername = "admin";
        // Si no existe un usuario con username = "admin" creo uno
        if (Iuser.findByUserName(adminUsername).isEmpty()) {

            //Datos de User
            User adminUser = new User();
            adminUser.setUserName(adminUsername);
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            // le asigno el rol ADMIN creado arriba
            adminUser.setRole(adminRole);

            //Datos de UserProfile
            UserProfile adminUserProfile = new UserProfile();
            adminUserProfile.setFirstName("Super");
            adminUserProfile.setLastName("Admin");
            adminUserProfile.setEmail("urbantracker751@gmail.com");
            // le asigno el User admin creado arriba
            adminUserProfile.setUser(adminUser);

            Iuser.save(adminUser);
            IuserProfile.save(adminUserProfile);

            System.out.println("✅ Usuario ADMIN creado (user:" + adminUsername + "/ pass: admin123)");
        }
    }

}
