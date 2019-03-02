package de.dd.protime.r3.model.dto;

import de.dd.protime.r3.system.GlobalCDIProducer;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import javax.ws.rs.PathParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
public class LocalDatePeriodParam {

    @PathParam("from")
    private String fromValue;

    @PathParam("to")
    private String toValue;

    private LocalDateTime get(String value) {
        try {
            return GlobalCDIProducer.DATEFORMAT.parse(value).toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        } catch (ParseException ex) {
            throw new WebApplicationException("Invalid Date-Format", Response.Status.BAD_REQUEST);

        }

    }

    public LocalDateTime getFrom() {
        return get(fromValue);
    }

    public LocalDateTime getTo() {
        return get(toValue);
    }

}
