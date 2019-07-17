package de.dd.protime.r3.repository;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import de.dd.protime.r3.model.Project;
import de.dd.protime.r3.model.Project_;
import de.dd.protime.r3.model.Record;
import de.dd.protime.r3.model.Record_;
import de.dd.protime.r3.model.User;

/**
 * @author GEDOPLAN, Dominik Mathmann
 */
public class ProjectRepository extends RepositoryUserOwned<Project> {

	@Inject
	private User user;

	@Override
	public Class<Project> getEntityClass() {
		return Project.class;
	}

	@Override
	public List<Project> getAll(Integer limit, Integer first) {
		
		List<Project> projects = super.getAll(limit, first);
		
		CriteriaBuilder builder = this.em.getCriteriaBuilder();
		CriteriaQuery<Object[]> cQuery = builder.createQuery(Object[].class);
		Root<Record> root = cQuery.from(Record.class);
		Join<Record, Project> joinRecord = root.join(Record_.project);
		cQuery.multiselect(joinRecord.get(Project_.id), builder.count(root));
		cQuery.groupBy(joinRecord.get(Project_.id));
		List<Object[]> resultList = em.createQuery(cQuery).getResultList();
		List<Integer> sortedProjectIds = resultList.stream()
			.sorted( (p1,p2) -> ((Long)p2[1]).compareTo(((Long)p1[1])))
			.map(p -> (Integer)p[0])
			.collect(Collectors.toList());
		
		Collections.sort(projects, Comparator.comparing(itm -> sortedProjectIds.indexOf(itm.getId())));
		return projects;
	}

}
