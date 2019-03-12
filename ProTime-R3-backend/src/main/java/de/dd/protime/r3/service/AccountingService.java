package de.dd.protime.r3.service;

import de.dd.protime.r3.model.Project;
import de.dd.protime.r3.model.dto.Report;
import de.dd.protime.r3.repository.ProjectRepository;
import de.dd.protime.r3.repository.RecordRepository;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.temporal.TemporalAdjusters;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.stream.IntStream;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

/**
 *
 * @author Dominik Mathmann
 */
@ApplicationScoped
public class AccountingService {

    @Inject
    private RecordRepository recordRepository;

    @Inject
    private ReportService reportService;

    @Inject
    private ProjectRepository projectRepository;

    public String generateReport(Report report) {
        report.setIncludeRideTime(true);
        report = this.reportService.generateReport(report);

        Map<Integer, Double[][]> projectTimes = new HashMap<>();
        Integer last = report.getFrom().with(TemporalAdjusters.lastDayOfMonth()).getDayOfMonth();

        report.getDays().stream().forEach(dayEntry -> {
            dayEntry.getEntries().stream().forEach(entry -> {
                if (!projectTimes.containsKey(entry.getProject())) {
                    projectTimes.put(entry.getProject(), new Double[][]{new Double[last], new Double[last]});
                }

                projectTimes.get(entry.getProject())[0][dayEntry.getDate().getDayOfMonth() - 1] = 1. / 60. * entry.getDuration();
                projectTimes.get(entry.getProject())[1][dayEntry.getDate().getDayOfMonth() - 1] = 1. / 60. * entry.getDurationNotAccountable();
            });
        });

        StringBuilder str = new StringBuilder();

        projectTimes.keySet().stream().forEach(projectid -> {
            Project project = this.projectRepository.findById(projectid);
            str.append(project.getProjectId());
            str.append(";");
            str.append(project.getProjectName());
            str.append("\n");

            IntStream.range(1, last + 1).mapToObj(i -> i + ";").forEach(str::append);
            str.append("\n");

            NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.GERMANY);

            Arrays.stream(projectTimes.get(projectid)[0]).map(r -> (r == null || r == 0 ? "" : numberFormat.format(r)) + ";").forEach(str::append);
            str.append("\n");
            Arrays.stream(projectTimes.get(projectid)[1]).map(r -> (r == null || r == 0 ? "" : numberFormat.format(r)) + ";").forEach(str::append);
            str.append("\n");
            str.append("\n");
        });

        return str.toString();

    }
}
