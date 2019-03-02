package de.dd.protime.r3.security;

import de.dd.protime.r3.model.User;
import de.dd.protime.r3.service.LoginService;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.security.enterprise.AuthenticationException;
import javax.security.enterprise.AuthenticationStatus;
import javax.security.enterprise.authentication.mechanism.http.HttpAuthenticationMechanism;
import javax.security.enterprise.authentication.mechanism.http.HttpMessageContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Context;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@ApplicationScoped
public class JWTAuthenticationMechanism implements HttpAuthenticationMechanism {

    private List<String> validTokens = new ArrayList<>();

    @Inject
    private LoginService authenticationService;

    @Override
    public AuthenticationStatus validateRequest(HttpServletRequest request, HttpServletResponse response,
            HttpMessageContext httpMessageContext) throws AuthenticationException {

        if (!httpMessageContext.isProtected()) {
            return httpMessageContext.doNothing();
        }
        
        String token = getToken(request);
        if (token!=null) {

            if (validTokens.contains(token)) {
                User auth = this.authenticationService.decode(token);
                if (auth != null) {
                    return httpMessageContext.notifyContainerAboutLogin(auth.getUser(), new HashSet<>(auth.getRoles()));
                }
            }
        }

        return httpMessageContext.responseUnauthorized();
    }

    public void invalidate(HttpServletRequest request) {
        this.validTokens.remove(getToken(request));
    }
    
    public void addValidToken(String token){
        this.validTokens.add(token);
    }

    private String getToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");

        return authorizationHeader == null || authorizationHeader.split(" ").length < 2 ? null : authorizationHeader.split(" ")[1];
    }

}
