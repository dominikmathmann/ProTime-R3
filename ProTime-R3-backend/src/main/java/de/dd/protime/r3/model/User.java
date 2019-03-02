package de.dd.protime.r3.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import javax.enterprise.inject.Vetoed;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Entity
@Table(name = "PTR3USER")
@Vetoed
public class User extends IntegerIdEntity {

    @Transient
    private String token;

    private String user;

    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<String> roles;

    public User() {
    }

    public User(Integer id, String token, String user, List<String> roles) {
        this.id=id;
        this.token = token;
        this.user = user;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public List<String> getRoles() {
        if (roles == null) {
            roles = new ArrayList<>();
        }
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
