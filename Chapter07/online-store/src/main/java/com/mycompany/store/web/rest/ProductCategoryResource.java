package com.mycompany.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.store.domain.ProductCategory;
import com.mycompany.store.service.ProductCategoryService;
import com.mycompany.store.web.rest.errors.BadRequestAlertException;
import com.mycompany.store.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProductCategory.
 */
@RestController
@RequestMapping("/api")
public class ProductCategoryResource {

    private final Logger log = LoggerFactory.getLogger(ProductCategoryResource.class);

    private static final String ENTITY_NAME = "productCategory";

    private final ProductCategoryService productCategoryService;

    public ProductCategoryResource(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    /**
     * POST  /product-categories : Create a new productCategory.
     *
     * @param productCategory the productCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productCategory, or with status 400 (Bad Request) if the productCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-categories")
    @Timed
    public ResponseEntity<ProductCategory> createProductCategory(@Valid @RequestBody ProductCategory productCategory) throws URISyntaxException {
        log.debug("REST request to save ProductCategory : {}", productCategory);
        if (productCategory.getId() != null) {
            throw new BadRequestAlertException("A new productCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductCategory result = productCategoryService.save(productCategory);
        return ResponseEntity.created(new URI("/api/product-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-categories : Updates an existing productCategory.
     *
     * @param productCategory the productCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productCategory,
     * or with status 400 (Bad Request) if the productCategory is not valid,
     * or with status 500 (Internal Server Error) if the productCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-categories")
    @Timed
    public ResponseEntity<ProductCategory> updateProductCategory(@Valid @RequestBody ProductCategory productCategory) throws URISyntaxException {
        log.debug("REST request to update ProductCategory : {}", productCategory);
        if (productCategory.getId() == null) {
            return createProductCategory(productCategory);
        }
        ProductCategory result = productCategoryService.save(productCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-categories : get all the productCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productCategories in body
     */
    @GetMapping("/product-categories")
    @Timed
    public List<ProductCategory> getAllProductCategories() {
        log.debug("REST request to get all ProductCategories");
        return productCategoryService.findAll();
        }

    /**
     * GET  /product-categories/:id : get the "id" productCategory.
     *
     * @param id the id of the productCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productCategory, or with status 404 (Not Found)
     */
    @GetMapping("/product-categories/{id}")
    @Timed
    public ResponseEntity<ProductCategory> getProductCategory(@PathVariable Long id) {
        log.debug("REST request to get ProductCategory : {}", id);
        ProductCategory productCategory = productCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productCategory));
    }

    /**
     * DELETE  /product-categories/:id : delete the "id" productCategory.
     *
     * @param id the id of the productCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductCategory(@PathVariable Long id) {
        log.debug("REST request to delete ProductCategory : {}", id);
        productCategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
