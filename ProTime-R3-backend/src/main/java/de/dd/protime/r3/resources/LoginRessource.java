package de.dd.protime.r3.resources;

import de.dd.protime.r3.model.User;
import de.dd.protime.r3.service.LoginService;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Path("login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginRessource {

    @Inject
    private LoginService jwtService;

    @POST
    public User login(User user) {
        String token = jwtService.login(user.getUser(), user.getPassword());
        if (token == null){
            throw new WebApplicationException("Login Invalid", Response.Status.FORBIDDEN);
        }
        
        user.setToken(token);
        return user;
    }
}
