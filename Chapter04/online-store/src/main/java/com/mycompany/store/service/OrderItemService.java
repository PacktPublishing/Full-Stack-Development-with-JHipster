package com.mycompany.store.service;

import com.mycompany.store.domain.OrderItem;
import com.mycompany.store.repository.OrderItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing OrderItem.
 */
@Service
@Transactional
public class OrderItemService {

    private final Logger log = LoggerFactory.getLogger(OrderItemService.class);

    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    /**
     * Save a orderItem.
     *
     * @param orderItem the entity to save
     * @return the persisted entity
     */
    public OrderItem save(OrderItem orderItem) {
        log.debug("Request to save OrderItem : {}", orderItem);
        return orderItemRepository.save(orderItem);
    }

    /**
     * Get all the orderItems.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<OrderItem> findAll(Pageable pageable) {
        log.debug("Request to get all OrderItems");
        return orderItemRepository.findAll(pageable);
    }

    /**
     * Get one orderItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public OrderItem findOne(Long id) {
        log.debug("Request to get OrderItem : {}", id);
        return orderItemRepository.findOne(id);
    }

    /**
     * Delete the orderItem by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete OrderItem : {}", id);
        orderItemRepository.delete(id);
    }
}
