package de.dd.protime.r3.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import de.dd.protime.r3.model.Project;
import de.dd.protime.r3.model.Project_;
import de.dd.protime.r3.model.Record;
import de.dd.protime.r3.model.Record_;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
public class RecordRepository extends RepositoryUserOwned<Record> {

    @Override
    public Class<Record> getEntityClass() {
        return Record.class;
    }

    public List<Record> find(LocalDateTime from, LocalDateTime to, Integer projectId, boolean includeRideTime, String description) {
        CriteriaBuilder builder = em.getCriteriaBuilder();

        CriteriaQuery<Record> query = builder.createQuery(Record.class);
        Root<Record> root = query.from(Record.class);
        query.select(root);

        List<Predicate> conditions = new ArrayList<>();
        Predicate datePredicate = builder.between(root.get(Record_.start), from, to);
        conditions.add(datePredicate);

        if (projectId != null) {
            conditions.add(builder.equal(root.get(Record_.project), this.em.getReference(Project.class, projectId)));
        }

        if (!includeRideTime) {
            conditions.add(builder.equal(root.get(Record_.journeyTime), false));
        }

        if (description != null) {
            description = "%" + description.toLowerCase() + "%";
            Join<Record, Project> joinProject = root.join(Record_.project);
            Predicate descriptionLike = builder.like( builder.lower(root.get(Record_.description)), description);
            Predicate projectNameLike = builder.like(builder.lower(joinProject.get(Project_.projectName)), description);
            Predicate projectIdLike = builder.like(builder.lower(joinProject.get(Project_.projectId)), description);

            conditions.add(builder.or(descriptionLike, projectIdLike, projectNameLike));
        }

        query.where(conditions.toArray(new Predicate[0]));

        return this.em.createQuery(query).getResultList();
    }
    
    public Map<Integer, Long> countRecordByProject() {
    	String jpql="select new map(r.project.id, count(r)) from Record r group by r.project.id order by count(r) desc";
    	
    	return this.em.createQuery(jpql, Map.class).getSingleResult();
    	
    }

}
