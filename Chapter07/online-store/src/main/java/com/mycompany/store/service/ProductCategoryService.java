package com.mycompany.store.service;

import com.mycompany.store.domain.ProductCategory;
import com.mycompany.store.repository.ProductCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing ProductCategory.
 */
@Service
@Transactional
public class ProductCategoryService {

    private final Logger log = LoggerFactory.getLogger(ProductCategoryService.class);

    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    /**
     * Save a productCategory.
     *
     * @param productCategory the entity to save
     * @return the persisted entity
     */
    public ProductCategory save(ProductCategory productCategory) {
        log.debug("Request to save ProductCategory : {}", productCategory);
        return productCategoryRepository.save(productCategory);
    }

    /**
     * Get all the productCategories.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ProductCategory> findAll() {
        log.debug("Request to get all ProductCategories");
        return productCategoryRepository.findAll();
    }

    /**
     * Get one productCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ProductCategory findOne(Long id) {
        log.debug("Request to get ProductCategory : {}", id);
        return productCategoryRepository.findOne(id);
    }

    /**
     * Delete the productCategory by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductCategory : {}", id);
        productCategoryRepository.delete(id);
    }
}
