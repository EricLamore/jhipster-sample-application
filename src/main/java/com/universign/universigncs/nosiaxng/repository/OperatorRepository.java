package com.universign.universigncs.nosiaxng.repository;
import com.universign.universigncs.nosiaxng.domain.Operator;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Operator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperatorRepository extends MongoRepository<Operator, String> {

}
