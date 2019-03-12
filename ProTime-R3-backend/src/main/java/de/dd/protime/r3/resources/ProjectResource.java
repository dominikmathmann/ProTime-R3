package de.dd.protime.r3.resources;

import de.dd.protime.r3.model.Project;
import de.dd.protime.r3.repository.ProjectRepository;
import de.dd.protime.r3.repository.RepositoryUserOwned;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Path;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Path("project")
@Stateless
@RolesAllowed("USER")
public class ProjectResource extends Resource<Project> {

    @Inject
    private ProjectRepository projectRepository;

    @Override
    RepositoryUserOwned<Project> getRepository() {
        return projectRepository;
    }

}
