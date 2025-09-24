package com.sena.urbantracker.config.init;


import com.sena.urbantracker.security.domain.entity.Role;
import com.sena.urbantracker.security.domain.entity.User;
import com.sena.urbantracker.security.domain.repository.RoleRepository;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final IUserProfile IuserProfile;

    // Creo los roles al iniciar el proyecto
    @Override
    public void run(String... args) {

        // Verifico si el rol ADMIN existe en la base de datos,
        // si no existe, lo creo y lo guardo
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(
                        Role.builder()
                                .name("ROLE_ADMIN")
                                .description("Tiene acceso completo al sistema")
                                .build()
                ));

        // Verifico si el rol DRIVER existe en la base de datos,
        // si no existe, lo creo y lo guardo
        roleRepository.findByName("ROLE_DRIVER")
                .orElseGet(() -> roleRepository.save(
                        Role.builder()
                                .name("ROLE_DRIVER")
                                .description("Usuario con permisos limitados a las funcionalidades de conductor")
                                .build()
                ));

        // Crear usuario ADMIN si no existe
        String adminUsername = "admin";
        // Si no existe un usuario con username = "admin" creo uno
        if (userRepository.findByUserName(adminUsername).isEmpty()) {

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

            userRepository.save(adminUser);
            IuserProfile.save(adminUserProfile);

            System.out.println("✅ Usuario ADMIN creado (user:" + adminUsername + "/ pass: admin123)");
        }
    }

}
