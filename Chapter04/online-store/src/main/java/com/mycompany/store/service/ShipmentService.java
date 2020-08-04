package com.mycompany.store.service;

import com.mycompany.store.domain.Shipment;
import com.mycompany.store.repository.ShipmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Shipment.
 */
@Service
@Transactional
public class ShipmentService {

    private final Logger log = LoggerFactory.getLogger(ShipmentService.class);

    private final ShipmentRepository shipmentRepository;

    public ShipmentService(ShipmentRepository shipmentRepository) {
        this.shipmentRepository = shipmentRepository;
    }

    /**
     * Save a shipment.
     *
     * @param shipment the entity to save
     * @return the persisted entity
     */
    public Shipment save(Shipment shipment) {
        log.debug("Request to save Shipment : {}", shipment);
        return shipmentRepository.save(shipment);
    }

    /**
     * Get all the shipments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Shipment> findAll(Pageable pageable) {
        log.debug("Request to get all Shipments");
        return shipmentRepository.findAll(pageable);
    }

    /**
     * Get one shipment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Shipment findOne(Long id) {
        log.debug("Request to get Shipment : {}", id);
        return shipmentRepository.findOne(id);
    }

    /**
     * Delete the shipment by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Shipment : {}", id);
        shipmentRepository.delete(id);
    }
}
