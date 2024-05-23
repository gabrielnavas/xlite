package api.posts.command;

import api.posts.dto.RegisterRequestDTO;
import api.posts.service.RegisterUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class FirstAdminUserCommandLine implements CommandLineRunner {

    @Autowired
    private RegisterUserService registerUserService;


    @Value("${api.admin.email}")
    private String adminEmail;

    @Value("${api.admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) {
        createAdminUser();
    }

    private void createAdminUser() {
        var dto = createRegisterRequestDTO();
        try {
            registerUserService.registerUserAdmin(dto);
        } catch (Exception ex) {
            System.out.println("admin already registred");
        }
    }


    private RegisterRequestDTO createRegisterRequestDTO() {
        final String name = adminEmail.split("@")[0];
        return new RegisterRequestDTO(
                name,
                name,
                adminEmail,
                adminPassword
        );
    }
}
