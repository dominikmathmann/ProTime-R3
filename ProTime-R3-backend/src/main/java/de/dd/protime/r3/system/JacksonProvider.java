
package de.dd.protime.r3.system;

import com.fasterxml.jackson.databind.ObjectMapper;
import javax.inject.Inject;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author GEDOPLAN, Dominik Mathmann
 */
@Provider
public class JacksonProvider implements ContextResolver<ObjectMapper> {
 
    @Inject
    private ObjectMapper mapper;
     
    @Override
    public ObjectMapper getContext(Class<?> type) {
        return mapper;
    }
}
