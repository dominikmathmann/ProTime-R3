package de.dd.protime.r3.resources;

import de.dd.protime.r3.model.dto.LocalDatePeriodParam;
import de.dd.protime.r3.model.dto.Report;
import de.dd.protime.r3.service.AccountingService;
import de.dd.protime.r3.service.ReportService;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Path("report")
@RolesAllowed("USER")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ReportRessource {

    @Inject
    private ReportService reportService;

    @Inject
    private AccountingService accountingService;

    @GET
    @Path("/{from}/{to}")
    public Report getReport(@BeanParam LocalDatePeriodParam period, @QueryParam("projectid") Integer projectId, @QueryParam("search") String search, @QueryParam("includeDrive") boolean includeDrive) {
        Report report = new Report();
        report.setFrom(period.getFrom());
        report.setTo(period.getTo());
        report.setIncludeRideTime(includeDrive);
        report.setFilter(search);
        report.setProjectId(projectId);
        report = this.reportService.generateReport(report);
        return report;
    }
    
    @GET
    @Path("/{from}/{to}")
    @Produces("application/csv")
    public String getAccountingReport(@BeanParam LocalDatePeriodParam period, @QueryParam("projectid") Integer projectId, @QueryParam("search") String search, @QueryParam("includeDrive") boolean includeDrive) {
        Report report = new Report();
        report.setFrom(period.getFrom());
        report.setTo(period.getTo());
        report.setIncludeRideTime(includeDrive);
        report.setFilter(search);
        report.setProjectId(projectId);
        
        return this.accountingService.generateReport(report);
    }
}
