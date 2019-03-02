package de.dd.protime.r3.service;

import de.dd.protime.r3.model.Record;
import de.dd.protime.r3.model.dto.Report;
import de.dd.protime.r3.model.dto.ReportDay;
import de.dd.protime.r3.repository.RecordRepository;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@ApplicationScoped
public class ReportService {

    @Inject
    private RecordRepository recordRepository;

    public Report generateReport(Report report) {
        List<Record> records = this.recordRepository.find(report.getFrom(), report.getTo(), report.getProjectId(), report.getIncludeRideTime(), report.getFilter());
        report.setDuration(0L);
        records.stream().forEach(r -> {
            ReportDay day = report.getReportDay(r.getStart());
            day.addEntry(r);
            report.setDuration(report.getDuration() + r.getDuration());
        });

        return report;

    }
}
