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
public class LocaleDateTimeParam {

    @PathParam("value")
    private String rawValue;

    public LocalDateTime getValue() {
        try {
            return GlobalCDIProducer.DATEFORMAT.parse(rawValue).toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        } catch (ParseException ex) {
            throw new WebApplicationException("Invalid Date-Format", Response.Status.BAD_REQUEST);

        }

    }

}
