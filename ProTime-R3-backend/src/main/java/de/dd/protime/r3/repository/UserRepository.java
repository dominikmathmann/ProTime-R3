package de.dd.protime.r3.repository;

import de.dd.protime.r3.model.User;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
public class UserRepository extends Repository<User> {

    @Override
    public Class<User> getEntityClass() {
        return User.class;
    }

}
