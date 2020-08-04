package com.mycompany.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.store.domain.ProductOrder;
import com.mycompany.store.service.ProductOrderService;
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
 * REST controller for managing ProductOrder.
 */
@RestController
@RequestMapping("/api")
public class ProductOrderResource {

    private final Logger log = LoggerFactory.getLogger(ProductOrderResource.class);

    private static final String ENTITY_NAME = "productOrder";

    private final ProductOrderService productOrderService;

    public ProductOrderResource(ProductOrderService productOrderService) {
        this.productOrderService = productOrderService;
    }

    /**
     * POST  /product-orders : Create a new productOrder.
     *
     * @param productOrder the productOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productOrder, or with status 400 (Bad Request) if the productOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-orders")
    @Timed
    public ResponseEntity<ProductOrder> createProductOrder(@Valid @RequestBody ProductOrder productOrder) throws URISyntaxException {
        log.debug("REST request to save ProductOrder : {}", productOrder);
        if (productOrder.getId() != null) {
            throw new BadRequestAlertException("A new productOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductOrder result = productOrderService.save(productOrder);
        return ResponseEntity.created(new URI("/api/product-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-orders : Updates an existing productOrder.
     *
     * @param productOrder the productOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productOrder,
     * or with status 400 (Bad Request) if the productOrder is not valid,
     * or with status 500 (Internal Server Error) if the productOrder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-orders")
    @Timed
    public ResponseEntity<ProductOrder> updateProductOrder(@Valid @RequestBody ProductOrder productOrder) throws URISyntaxException {
        log.debug("REST request to update ProductOrder : {}", productOrder);
        if (productOrder.getId() == null) {
            return createProductOrder(productOrder);
        }
        ProductOrder result = productOrderService.save(productOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productOrder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-orders : get all the productOrders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productOrders in body
     */
    @GetMapping("/product-orders")
    @Timed
    public ResponseEntity<List<ProductOrder>> getAllProductOrders(Pageable pageable) {
        log.debug("REST request to get a page of ProductOrders");
        Page<ProductOrder> page = productOrderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/product-orders");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /product-orders/:id : get the "id" productOrder.
     *
     * @param id the id of the productOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productOrder, or with status 404 (Not Found)
     */
    @GetMapping("/product-orders/{id}")
    @Timed
    public ResponseEntity<ProductOrder> getProductOrder(@PathVariable Long id) {
        log.debug("REST request to get ProductOrder : {}", id);
        ProductOrder productOrder = productOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productOrder));
    }

    /**
     * DELETE  /product-orders/:id : delete the "id" productOrder.
     *
     * @param id the id of the productOrder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductOrder(@PathVariable Long id) {
        log.debug("REST request to delete ProductOrder : {}", id);
        productOrderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
