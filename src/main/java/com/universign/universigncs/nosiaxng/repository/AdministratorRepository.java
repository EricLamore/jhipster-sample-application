package com.universign.universigncs.nosiaxng.repository;
import com.universign.universigncs.nosiaxng.domain.Administrator;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Administrator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdministratorRepository extends MongoRepository<Administrator, String> {

}
