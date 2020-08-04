package com.mycompany.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.store.domain.Shipment;
import com.mycompany.store.service.ShipmentService;
import com.mycompany.store.web.rest.errors.BadRequestAlertException;
import com.mycompany.store.web.rest.util.HeaderUtil;
import com.mycompany.store.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Shipment.
 */
@RestController
@RequestMapping("/api")
public class ShipmentResource {

    private final Logger log = LoggerFactory.getLogger(ShipmentResource.class);

    private static final String ENTITY_NAME = "shipment";

    private final ShipmentService shipmentService;

    public ShipmentResource(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    /**
     * POST  /shipments : Create a new shipment.
     *
     * @param shipment the shipment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shipment, or with status 400 (Bad Request) if the shipment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shipments")
    @Timed
    public ResponseEntity<Shipment> createShipment(@Valid @RequestBody Shipment shipment) throws URISyntaxException {
        log.debug("REST request to save Shipment : {}", shipment);
        if (shipment.getId() != null) {
            throw new BadRequestAlertException("A new shipment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Shipment result = shipmentService.save(shipment);
        return ResponseEntity.created(new URI("/api/shipments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shipments : Updates an existing shipment.
     *
     * @param shipment the shipment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shipment,
     * or with status 400 (Bad Request) if the shipment is not valid,
     * or with status 500 (Internal Server Error) if the shipment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shipments")
    @Timed
    public ResponseEntity<Shipment> updateShipment(@Valid @RequestBody Shipment shipment) throws URISyntaxException {
        log.debug("REST request to update Shipment : {}", shipment);
        if (shipment.getId() == null) {
            return createShipment(shipment);
        }
        Shipment result = shipmentService.save(shipment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shipment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shipments : get all the shipments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of shipments in body
     */
    @GetMapping("/shipments")
    @Timed
    public ResponseEntity<List<Shipment>> getAllShipments(Pageable pageable) {
        log.debug("REST request to get a page of Shipments");
        Page<Shipment> page = shipmentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/shipments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /shipments/:id : get the "id" shipment.
     *
     * @param id the id of the shipment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shipment, or with status 404 (Not Found)
     */
    @GetMapping("/shipments/{id}")
    @Timed
    public ResponseEntity<Shipment> getShipment(@PathVariable Long id) {
        log.debug("REST request to get Shipment : {}", id);
        Shipment shipment = shipmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shipment));
    }

    /**
     * DELETE  /shipments/:id : delete the "id" shipment.
     *
     * @param id the id of the shipment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shipments/{id}")
    @Timed
    public ResponseEntity<Void> deleteShipment(@PathVariable Long id) {
        log.debug("REST request to delete Shipment : {}", id);
        shipmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
