package de.dd.protime.r3.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.enterprise.inject.spi.CDI;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@MappedSuperclass
public class UserOwnedEntity extends IntegerIdEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @PrePersist
    @PreUpdate
    private void setUser() {
        User p = CDI.current().select(User.class).get();
        this.user = p;

    }

}
