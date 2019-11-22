package com.universign.universigncs.nosiaxng.repository;
import com.universign.universigncs.nosiaxng.domain.ErrorRequest;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the ErrorRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ErrorRequestRepository extends MongoRepository<ErrorRequest, String> {

}
