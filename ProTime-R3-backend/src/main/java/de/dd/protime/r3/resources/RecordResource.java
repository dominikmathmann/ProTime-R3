package de.dd.protime.r3.resources;

import de.dd.protime.r3.model.Record;
import de.dd.protime.r3.model.dto.LocalDatePeriodParam;
import de.dd.protime.r3.repository.RecordRepository;
import de.dd.protime.r3.repository.RepositoryUserOwned;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.BeanParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Path("record")
@RolesAllowed("USER")
public class RecordResource extends Resource<Record> {

    @Inject
    private RecordRepository recordRepository;

    @Override
    RepositoryUserOwned<Record> getRepository() {
        return recordRepository;
    }


    @GET
    @Path("/find/{from}/{to}")
    public List<Record> findRecords(@BeanParam LocalDatePeriodParam period, @QueryParam("projectid") Integer projectId, @QueryParam("search") String search, @QueryParam("include-drive") boolean includeDrive) {
        return this.recordRepository.find(period.getFrom(), period.getTo(), projectId, true, search);
    }
}
