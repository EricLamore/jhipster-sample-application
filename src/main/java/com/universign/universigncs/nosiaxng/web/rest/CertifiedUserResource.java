package com.universign.universigncs.nosiaxng.web.rest;

import com.universign.universigncs.nosiaxng.domain.CertifiedUser;
import com.universign.universigncs.nosiaxng.repository.CertifiedUserRepository;
import com.universign.universigncs.nosiaxng.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.universign.universigncs.nosiaxng.domain.CertifiedUser}.
 */
@RestController
@RequestMapping("/api")
public class CertifiedUserResource {

    private final Logger log = LoggerFactory.getLogger(CertifiedUserResource.class);

    private static final String ENTITY_NAME = "certifiedUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CertifiedUserRepository certifiedUserRepository;

    public CertifiedUserResource(CertifiedUserRepository certifiedUserRepository) {
        this.certifiedUserRepository = certifiedUserRepository;
    }

    /**
     * {@code POST  /certified-users} : Create a new certifiedUser.
     *
     * @param certifiedUser the certifiedUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new certifiedUser, or with status {@code 400 (Bad Request)} if the certifiedUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/certified-users")
    public ResponseEntity<CertifiedUser> createCertifiedUser(@RequestBody CertifiedUser certifiedUser) throws URISyntaxException {
        log.debug("REST request to save CertifiedUser : {}", certifiedUser);
        if (certifiedUser.getId() != null) {
            throw new BadRequestAlertException("A new certifiedUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CertifiedUser result = certifiedUserRepository.save(certifiedUser);
        return ResponseEntity.created(new URI("/api/certified-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /certified-users} : Updates an existing certifiedUser.
     *
     * @param certifiedUser the certifiedUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated certifiedUser,
     * or with status {@code 400 (Bad Request)} if the certifiedUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the certifiedUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/certified-users")
    public ResponseEntity<CertifiedUser> updateCertifiedUser(@RequestBody CertifiedUser certifiedUser) throws URISyntaxException {
        log.debug("REST request to update CertifiedUser : {}", certifiedUser);
        if (certifiedUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CertifiedUser result = certifiedUserRepository.save(certifiedUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, certifiedUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /certified-users} : get all the certifiedUsers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of certifiedUsers in body.
     */
    @GetMapping("/certified-users")
    public ResponseEntity<List<CertifiedUser>> getAllCertifiedUsers(Pageable pageable) {
        log.debug("REST request to get a page of CertifiedUsers");
        Page<CertifiedUser> page = certifiedUserRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /certified-users/:id} : get the "id" certifiedUser.
     *
     * @param id the id of the certifiedUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the certifiedUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/certified-users/{id}")
    public ResponseEntity<CertifiedUser> getCertifiedUser(@PathVariable String id) {
        log.debug("REST request to get CertifiedUser : {}", id);
        Optional<CertifiedUser> certifiedUser = certifiedUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(certifiedUser);
    }

    /**
     * {@code DELETE  /certified-users/:id} : delete the "id" certifiedUser.
     *
     * @param id the id of the certifiedUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/certified-users/{id}")
    public ResponseEntity<Void> deleteCertifiedUser(@PathVariable String id) {
        log.debug("REST request to delete CertifiedUser : {}", id);
        certifiedUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
