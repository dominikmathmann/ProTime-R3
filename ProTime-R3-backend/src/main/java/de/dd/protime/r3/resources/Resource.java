package de.dd.protime.r3.resources;

import de.dd.protime.r3.model.UserOwnedEntity;
import de.dd.protime.r3.repository.RepositoryUserOwned;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public abstract class Resource<T extends UserOwnedEntity> {

    abstract RepositoryUserOwned<T> getRepository();

    @GET
    public List<T> getAll(@QueryParam("limit") int limit) {
        return getRepository().getAll(limit);
    }

    @POST
    public T post(T entity) {
        if (entity.getId() != null) {
            throw new WebApplicationException("POST with existing id", Response.Status.BAD_REQUEST);
        }
        return getRepository().merge(entity);
    }

    @PUT
    @Path("{id}")
    public T put(@PathParam("id") Integer id, T entity) {
        if (entity.getId() == null || !entity.getId().equals(id)) {
            throw new WebApplicationException("model id and path id did not match", Response.Status.BAD_REQUEST);
        }
        return getRepository().merge(entity);
    }

}
