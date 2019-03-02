package de.dd.protime.r3.system;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import de.dd.protime.r3.system.qualifier.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@ApplicationScoped
public class GlobalCDIProducer {

    @Produces
    @PersistenceContext(unitName = "default")
    private EntityManager em;

    private ObjectMapper mapper;

    private static final String DATETIMEPATTERN = "dd.MM.yyyy'T'HH:mm";
    
    private static final String DATEPATTERN = "dd.MM.yyyy";
   
    @Produces
    public static final DateFormat DATETIMEFORMAT = new SimpleDateFormat(DATETIMEPATTERN);
    
    @Date
    @Produces
    public static final DateFormat DATEFORMAT = new SimpleDateFormat(DATEPATTERN);
    


    @Produces
    public ObjectMapper getMapper() {
        if (this.mapper == null) {
            this.mapper = new ObjectMapper();
            this.mapper.findAndRegisterModules();
            this.mapper.setDateFormat(DATETIMEFORMAT);
            JavaTimeModule javaTimeModule = new JavaTimeModule();
            javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DATETIMEPATTERN)));
            mapper.registerModule(javaTimeModule);
            mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

        }
        return this.mapper;
    }

}
