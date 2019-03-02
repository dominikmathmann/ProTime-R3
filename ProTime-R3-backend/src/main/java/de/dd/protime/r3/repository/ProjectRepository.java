package de.dd.protime.r3.repository;

import de.dd.protime.r3.model.Project;

/**
 * @author GEDOPLAN, Dominik Mathmann
 */
public class ProjectRepository extends RepositoryUserOwned<Project> {

    @Override
    public Class<Project> getEntityClass() {
        return Project.class;
    }

}
