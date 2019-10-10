package de.dd.protime.r3.service;

import de.dd.protime.r3.model.Project;
import de.dd.protime.r3.model.dto.Report;
import de.dd.protime.r3.repository.ProjectRepository;
import de.dd.protime.r3.repository.RecordRepository;
import java.text.NumberFormat;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
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
        NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.GERMANY);
        projectTimes.keySet().stream().forEach(projectid -> {
            Project project = this.projectRepository.findById(projectid);
            str.append(project.getProjectId());
            str.append(";");
            str.append(project.getProjectName());
            str.append("\n");

            IntStream.range(1, last + 1).mapToObj(i -> i + ";").forEach(str::append);
            str.append("\n");

            Arrays.stream(projectTimes.get(projectid)[0]).map(r -> (r == null || r == 0 ? "" : numberFormat.format(r)) + ";").forEach(str::append);
            str.append("\n");
            Arrays.stream(projectTimes.get(projectid)[1]).map(r -> (r == null || r == 0 ? "" : numberFormat.format(r)) + ";").forEach(str::append);
            str.append("\n");
            str.append("\n");
        });

        // build sum-row
        str.append("Summe;;");
        str.append("\n");

        IntStream.range(1, last + 1).mapToObj(i -> i + ";").forEach(str::append);
        str.append("\n");

        Double[] sumA = new Double[last];
        Double[] sumB = new Double[last];

        for (Double[][] projectTime : projectTimes.values()) {
            for (int i = 0; i < last; i++) {

                if (sumA[i] == null) {
                    sumA[i] = 0.;
                }
                if (sumB[i] == null) {
                    sumB[i] = 0.;
                }
                final Double ta = projectTime[0][i];
                if (ta != null) {
                    sumA[i] += ta;
                }

                final Double tb = projectTime[1][i];
                if (tb != null) {
                    sumB[i] += tb;
                }
            }
        }

        Arrays.stream(sumA).map(r -> (r == null || r == 0 ? "" : numberFormat.format(r)) + ";").forEach(str::append);
        str.append("\n");
        Arrays.stream(sumB).map(r -> (r == null || r == 0 ? "" : numberFormat.format(r)) + ";").forEach(str::append);
        str.append("\n");
        str.append("\n");

        return str.toString();

    }
}
