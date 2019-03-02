package de.dd.protime.r3.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
public class Report {

    @JsonFormat(pattern = "dd.MM.yyyy'T'HH:mm")
    private LocalDateTime from;

    @JsonFormat(pattern = "dd.MM.yyyy'T'HH:mm")
    private LocalDateTime to;

    private Boolean includeRideTime = false;

    private Integer projectId;

    private String filter;

    private Set<ReportDay> days;

    private Long duration;

    public ReportDay getReportDay(LocalDateTime date) {
        LocalDate localDate = date.toLocalDate();
        Optional<ReportDay> findFirst = this.getDays().stream().filter(e -> e.getDate().equals(localDate)).findFirst();

        ReportDay reportDay;
        if (findFirst.isPresent()) {
            reportDay = findFirst.get();
        } else {
            reportDay = new ReportDay();
            reportDay.setDate(localDate);
            this.getDays().add(reportDay);
        }
        return reportDay;
    }

    public Set<ReportDay> getDays() {
        if (days == null) {
            days = new TreeSet<>(new Comparator<ReportDay>() {
                @Override
                public int compare(ReportDay o1, ReportDay o2) {
                    return o1.getDate().compareTo(o2.getDate());
                }
            });
        }
        return days;
    }

    public void setDays(Set<ReportDay> days) {
        this.days = days;
    }

    public LocalDateTime getFrom() {
        return from;
    }

    public void setFrom(LocalDateTime from) {
        this.from = from;
    }

    public LocalDateTime getTo() {
        return to;
    }

    public void setTo(LocalDateTime to) {
        this.to = to;
    }

    public Boolean getIncludeRideTime() {
        return includeRideTime;
    }

    public void setIncludeRideTime(Boolean includeRideTime) {
        this.includeRideTime = includeRideTime;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

}
