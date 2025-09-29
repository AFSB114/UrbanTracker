package com.sena.urbantracker.config.init;


import com.sena.urbantracker.security.domain.entity.RoleDomain;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.RoleRepository;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import com.sena.urbantracker.users.domain.entity.UserProfileDomain;
import com.sena.urbantracker.users.domain.repository.UserProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserProfileRepository userProfileRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void initData() {
        // Roles
        RoleDomain adminRole = roleRepository.findByName("ADMIN")
                .orElseGet(() -> roleRepository.save(
                        RoleDomain.builder()
                                .name("ADMIN")
                                .description("Tiene acceso completo al sistema")
                                .build()
                ));

        roleRepository.findByName("DRIVER")
                .orElseGet(() -> roleRepository.save(
                        RoleDomain.builder()
                                .name("DRIVER")
                                .description("Usuario con permisos limitados a las funcionalidades de conductor")
                                .build()
                ));

        // Usuario ADMIN
        String adminUsername = "admin";
        if (userRepository.findByUserName(adminUsername).isEmpty()) {
            UserDomain adminUser = new UserDomain();
            adminUser.setUserName(adminUsername);
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setRole(adminRole);
            adminUser = userRepository.save(adminUser);

            UserProfileDomain adminProfile = UserProfileDomain.builder()
                    .firstName("Super")
                    .lastName("Admin")
                    .email("urbantracker751@gmail.com")
                    .user(adminUser)
                    .build();
            userProfileRepository.save(adminProfile);

        }
        System.out.println("✅ Usuario ADMIN creado (user: " + adminUsername + " | pass: admin123)");
    }
}