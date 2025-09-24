package com.sena.urbantracker.config.init;


import com.sena.urbantracker.security.domain.entity.RoleDomain;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.RoleRepository;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import com.sena.urbantracker.users.domain.entity.UserProfileDomain;
import com.sena.urbantracker.users.domain.repository.UserProfileRepository;
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
    private final UserProfileRepository userProfileRepository;

    // Creo los roles al iniciar el proyecto
    @Override
    public void run(String... args) {

        // Verifico si el rol ADMIN existe en la base de datos,
        // si no existe, lo creo y lo guardo
        RoleDomain adminRole = roleRepository.findByName("ADMIN")
                .orElseGet(() -> roleRepository.save(
                        RoleDomain.builder()
                                .name("ADMIN")
                                .description("Tiene acceso completo al sistema")
                                .build()
                ));

        // Verifico si el rol DRIVER existe en la base de datos,
        // si no existe, lo creo y lo guardo
        roleRepository.findByName("DRIVER")
                .orElseGet(() -> roleRepository.save(
                        RoleDomain.builder()
                                .name("DRIVER")
                                .description("Usuario con permisos limitados a las funcionalidades de conductor")
                                .build()
                ));

        // Crear usuario ADMIN si no existe
        String adminUsername = "admin";
        // Si no existe un usuario con username = "admin" creo uno
        if (userRepository.findByUserName(adminUsername).isEmpty()) {

            //Datos de User
            UserDomain adminUser = new UserDomain();
            adminUser.setUserName(adminUsername);
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            // le asigno el rol ADMIN creado arriba
            adminUser.setRole(adminRole);

            //Datos de UserProfile
            UserProfileDomain adminUserProfile = UserProfileDomain.builder()
                    .firstName("Super")
                    .lastName("Admin")
                    .email("urbantracker751@gmail.com")
                    .user(adminUser)
                    .build();

            userRepository.save(adminUser);
            userProfileRepository.save(adminUserProfile);

            System.out.println("✅ Usuario ADMIN creado (user:" + adminUsername + "/ pass: admin123)");
        }
    }

}
