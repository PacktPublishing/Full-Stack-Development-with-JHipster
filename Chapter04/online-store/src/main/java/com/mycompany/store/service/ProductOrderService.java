package com.mycompany.store.service;

import com.mycompany.store.domain.ProductOrder;
import com.mycompany.store.repository.ProductOrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProductOrder.
 */
@Service
@Transactional
public class ProductOrderService {

    private final Logger log = LoggerFactory.getLogger(ProductOrderService.class);

    private final ProductOrderRepository productOrderRepository;

    public ProductOrderService(ProductOrderRepository productOrderRepository) {
        this.productOrderRepository = productOrderRepository;
    }

    /**
     * Save a productOrder.
     *
     * @param productOrder the entity to save
     * @return the persisted entity
     */
    public ProductOrder save(ProductOrder productOrder) {
        log.debug("Request to save ProductOrder : {}", productOrder);
        return productOrderRepository.save(productOrder);
    }

    /**
     * Get all the productOrders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProductOrder> findAll(Pageable pageable) {
        log.debug("Request to get all ProductOrders");
        return productOrderRepository.findAll(pageable);
    }

    /**
     * Get one productOrder by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ProductOrder findOne(Long id) {
        log.debug("Request to get ProductOrder : {}", id);
        return productOrderRepository.findOne(id);
    }

    /**
     * Delete the productOrder by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductOrder : {}", id);
        productOrderRepository.delete(id);
    }
}
