package de.dd.protime.r3.resources;

import de.dd.protime.r3.security.JWTAuthenticationMechanism;
import de.dd.protime.r3.service.LoginService;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Path("logout")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LogoutRessource {

    @Inject
    private LoginService loginService;
    
    @Context private HttpServletRequest servletRequest;

    @GET
    public Response logout() {
        this.loginService.logout(servletRequest);
        return Response.ok().build();
    }
}
