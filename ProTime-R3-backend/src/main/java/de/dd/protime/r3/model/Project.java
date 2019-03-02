package de.dd.protime.r3.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Entity
@Table(name = "PTR3PROJECT")
public class Project extends UserOwnedEntity {

    private String projectId;

    private String projectName;

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }


    

}
