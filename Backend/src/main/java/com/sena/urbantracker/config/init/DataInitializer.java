package com.sena.urbantracker.config.init;


import com.sena.urbantracker.security.model.entity.Role;
import com.sena.urbantracker.security.repository.IRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final IRole Irole;

    public DataInitializer(IRole roleRepository) {
        this.Irole = roleRepository;
    }

    //Creo los roles al iniciar el proyecto
    @Override
    public void run(String... args) {

        //verifico si los roles existen para no crearlos de nuevo
        if (Irole.findByName("ROLE_ADMIN").isEmpty()) {
            Role admin = Role.builder()
                    .name("ROLE_ADMIN")
                    .description("Tiene acceso completo al sistema")
                    .build();
            Irole.save(admin);
        }
        if (Irole.findByName("ROLE_DRIVER").isEmpty()) {
            Role driver = Role.builder()
                    .name("ROLE_DRIVER")
                    .description("Usuario con permisos limitados a las funcionalidades de conductor")
                    .build();
            Irole.save(driver);
        }
    }
}
