package de.dd.protime.r3.model.dto;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
public class ReportEntry {

    private Integer project;

    private String description = "";

    private Long duration = 0L;
    
    private Long durationNotAccountable = 0L;

    public void addDuration(Long l) {
        this.duration += l;
    }
    
    public void addNotAccountableDuration(Long l) {
        this.durationNotAccountable += l;
    }

    public void addDescription(String d) {
        if (!this.description.contains(d)) {
            description = description + (description.isEmpty() ? "" : ", ") + d;
        }
    }

    public Integer getProject() {
        return project;
    }

    public void setProject(Integer project) {
        this.project = project;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Long getDurationNotAccountable() {
        return durationNotAccountable;
    }

    public void setDurationNotAccountable(Long durationNotAccountable) {
        this.durationNotAccountable = durationNotAccountable;
    }
    
    

}
