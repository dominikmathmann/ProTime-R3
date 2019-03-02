package de.dd.protime.r3.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import de.dd.protime.r3.model.User;
import de.dd.protime.r3.repository.UserRepository;
import de.dd.protime.r3.security.JWTAuthenticationMechanism;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.xml.bind.DatatypeConverter;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@RequestScoped
public class LoginService {

    private final JWTVerifier verifier;

    private final Algorithm algorithm;

    @Inject
    private UserRepository userRepository;

    @Produces
    private User user;

    @Inject
    private JWTAuthenticationMechanism auth;

    public static final String SYS_KEY_SECRET ="PT3-SECRET";
    
    public LoginService() {
        final String secret = System.getProperty(SYS_KEY_SECRET);
        algorithm = Algorithm.HMAC256(secret==null?"DemoSecret":secret);
        verifier = JWT.require(algorithm).build();
    }

    public User decode(String token) {
        try {
            DecodedJWT decodedJwt = verifier.verify(token);
            user = new User(decodedJwt.getClaim("USERREF").asInt(), token, decodedJwt.getIssuer(), decodedJwt.getClaim("GROUPS").asList(String.class));

            return user;
        } catch (JWTVerificationException exception) {
            //Invalid signature/claims
        }

        return null;
    }

    public String login(String username, String password) {

        final User user = this.userRepository.findUniqueByAttribute("user", username);
        if (user == null) {
            throw new WebApplicationException("Invalid Login", Response.Status.FORBIDDEN);
        }
        if (user.getPassword().equalsIgnoreCase(getHash(password))) {
            try {
                final List<String> roles = user.getRoles();
                roles.add("USER");
                String token = JWT.create()
                        .withIssuer(username)
                        .withClaim("USERREF", user.getId())
                        .withArrayClaim("GROUPS", roles.toArray(new String[0]))
                        .sign(algorithm);
                this.auth.addValidToken(token);
                return token;
            } catch (JWTCreationException exception) {
                //Invalid Signing configuration / Couldn't convert Claims.
            }
        }

        return null;
    }

    private String getHash(String value) {
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("MD5");
            md.update(value.getBytes());
            byte[] digest = md.digest();
            String myHash = DatatypeConverter
                    .printHexBinary(digest).toUpperCase();

            return myHash;
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(LoginService.class.getName()).log(Level.SEVERE, null, ex);
            return "";
        }
    }

    public void logout(HttpServletRequest servletRequest) {
       this.auth.invalidate(servletRequest);
    }
}
