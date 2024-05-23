package api.posts.infra.security;


import api.posts.models.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.zone.offset}")
    private String zoneOffset;

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user) {
        try {
            // ter certeza que o token veio desse servidor
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("login-auth-api") // nome do micro servico ou servidor
                    .withSubject(user.getEmail())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);


        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while authenticatig");
        }
    }

    public String validateTokenAndGetSubject(String token) {
        if (token == null) return null;
        final String tokenWithoutBearer = token.replace("Bearer ", "");
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.require(algorithm)
                .withIssuer("login-auth-api")
                .build()
                .verify(tokenWithoutBearer)
                .getSubject();
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of(zoneOffset));
    }
}
