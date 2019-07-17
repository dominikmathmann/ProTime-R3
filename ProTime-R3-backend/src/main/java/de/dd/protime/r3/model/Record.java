package de.dd.protime.r3.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import de.dd.protime.r3.system.JPAJacksonResolver;
import java.time.Duration;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.PostLoad;
import javax.persistence.PostPersist;
import javax.persistence.PostUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Entity
@Table(name = "PTR3RECORD")
public class Record extends UserOwnedEntity {

    @JsonFormat(pattern = "dd.MM.yyyy'T'HH:mm")
    private LocalDateTime start;

    @JsonFormat(pattern = "dd.MM.yyyy'T'HH:mm")
    private LocalDateTime end;

    @JsonIdentityInfo(
            resolver = JPAJacksonResolver.class,
            generator = ObjectIdGenerators.PropertyGenerator.class,
            scope = Project.class,
            property = "id"
    )
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Project project;

    private String description;

    private boolean journeyTime;

    @Transient
    protected Long duration = 0L;

    public Record() {
    }

    public Record(Integer id, LocalDateTime start, LocalDateTime end, Project project, String description, Long duration) {
        super.id = id;
        this.start = start;
        this.end = end;
        this.project = project;
        this.description = description;
        this.duration = duration;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
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

    public boolean isJourneyTime() {
        return journeyTime;
    }

    public void setJourneyTime(boolean journeyTime) {
        this.journeyTime = journeyTime;
    }

    @PostLoad
    @PostPersist
    @PostUpdate
    protected void postLoad() {
        if (this.start != null && this.end != null) {
            this.duration = Duration.between(this.start, this.end).toMinutes();
            if (this.journeyTime) {
                this.duration = this.duration / 2;
            }
        }
    }
    
    @JsonIgnore
    public boolean isNotAccountingRelevant(){
        return this.journeyTime;
    }

}
