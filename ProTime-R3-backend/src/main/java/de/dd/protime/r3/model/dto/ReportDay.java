package de.dd.protime.r3.model.dto;

import de.dd.protime.r3.model.Record;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
public class ReportDay {

    private LocalDate date;

    private Set<ReportEntry> entries;

    private Long duration = 0L;

    public void addEntry(Record record) {

        this.duration += record.getDuration();

        Optional<ReportEntry> existingProjectEntry = this.getEntries().stream().filter(e -> e.getProject().equals(record.getProject().getId())).findFirst();

        ReportEntry entry;
        if (existingProjectEntry.isPresent()) {
            entry = existingProjectEntry.get();
        } else {
            entry = new ReportEntry();
            entry.setProject(record.getProject().getId());
            this.entries.add(entry);
        }

        if (record.isJourneyTime()) {
            entry.addNotAccountableDuration(record.getDuration());
        } else {
            entry.addDuration(record.getDuration());
            entry.addDescription(record.getDescription());
        }
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<ReportEntry> getEntries() {
        if (entries == null) {
            entries = new TreeSet<ReportEntry>(new Comparator<ReportEntry>() {
                @Override
                public int compare(ReportEntry o1, ReportEntry o2) {
                    return o1.getProject().compareTo(o2.getProject());
                }
            });
        }
        return entries;
    }

    public void setEntries(Set<ReportEntry> entries) {
        this.entries = entries;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

}
