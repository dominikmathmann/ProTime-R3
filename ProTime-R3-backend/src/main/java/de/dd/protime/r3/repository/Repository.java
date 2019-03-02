package de.dd.protime.r3.repository;

import de.dd.protime.r3.model.IntegerIdEntity;
import java.util.List;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Transactional
public abstract class Repository<T extends IntegerIdEntity> {

    @Inject
    protected EntityManager em;

    public abstract Class<T> getEntityClass();


    public T findUniqueByAttribute(String attribute, Object value) {
        CriteriaBuilder criteriaBuilder = this.em.getCriteriaBuilder();
        CriteriaQuery<T> query = criteriaBuilder.createQuery(getEntityClass());
        Root<T> root = query.from(getEntityClass());
        query.select(root);
        query.where(criteriaBuilder.equal(root.get(attribute), value));
        TypedQuery<T> createQuery = this.em.createQuery(query);
        final List<T> list = createQuery.getResultList();
        return list.isEmpty()?null:list.get(0);
    }

}
