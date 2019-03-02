package de.dd.protime.r3.repository;

import de.dd.protime.r3.model.User;
import de.dd.protime.r3.model.UserOwnedEntity;
import de.dd.protime.r3.model.UserOwnedEntity_;
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
public abstract class RepositoryUserOwned<T extends UserOwnedEntity> {

    @Inject
    protected EntityManager em;

    @Inject
    private User user;
    
    public abstract Class<T> getEntityClass();

    public List<T> getAll(Integer limit) {
        CriteriaBuilder criteriaBuilder = this.em.getCriteriaBuilder();
        CriteriaQuery<T> query = criteriaBuilder.createQuery(getEntityClass());
        Root<T> root = query.from(getEntityClass());
        query.select(root);
        query.where(criteriaBuilder.equal(root.get(UserOwnedEntity_.user), user));
        query.orderBy(criteriaBuilder.desc(root.get("id")));
        
        TypedQuery<T> createQuery = this.em.createQuery(query);
        if (limit != null && limit > 0) {
            createQuery.setMaxResults(limit);
        }
        
        

        List<T> resultList = createQuery.getResultList();
        return resultList;
    }

    public T merge(T entity) {
        return this.em.merge(entity);
    }
    
    public T findById(Integer id){
        return this.em.find(getEntityClass(), id);
    }

}
