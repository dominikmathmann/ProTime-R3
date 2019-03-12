package de.dd.protime.r3.repository;

import de.dd.protime.r3.model.User;
import de.dd.protime.r3.model.User_;
import java.util.List;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
public class UserRepository {

    @Inject
    protected EntityManager em;

    public User findUserByLogin(String login) {
        CriteriaBuilder criteriaBuilder = this.em.getCriteriaBuilder();
        CriteriaQuery<User> query = criteriaBuilder.createQuery(User.class);
        Root<User> root = query.from(User.class);
        query.select(root);
        query.where(criteriaBuilder.equal(root.get(User_.user), login));
        TypedQuery<User> createQuery = this.em.createQuery(query);
        final List<User> list = createQuery.getResultList();
        return list.isEmpty() ? null : list.get(0);
    }

}
