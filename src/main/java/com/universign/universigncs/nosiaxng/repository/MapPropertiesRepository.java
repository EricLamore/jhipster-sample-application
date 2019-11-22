package com.universign.universigncs.nosiaxng.repository;
import com.universign.universigncs.nosiaxng.domain.MapProperties;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the MapProperties entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MapPropertiesRepository extends MongoRepository<MapProperties, String> {

}
