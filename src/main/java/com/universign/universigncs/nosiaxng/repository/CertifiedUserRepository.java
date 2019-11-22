package com.universign.universigncs.nosiaxng.repository;
import com.universign.universigncs.nosiaxng.domain.CertifiedUser;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the CertifiedUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CertifiedUserRepository extends MongoRepository<CertifiedUser, String> {

}
