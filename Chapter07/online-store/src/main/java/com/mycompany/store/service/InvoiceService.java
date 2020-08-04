package com.mycompany.store.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mycompany.store.domain.Invoice;
import com.mycompany.store.repository.InvoiceRepository;
import com.mycompany.store.security.AuthoritiesConstants;
import com.mycompany.store.security.SecurityUtils;


/**
 * Service Implementation for managing Invoice.
 */
@Service
@Transactional
public class InvoiceService {

    private final Logger log = LoggerFactory.getLogger(InvoiceService.class);

    private final InvoiceRepository invoiceRepository;

    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    /**
     * Save a invoice.
     *
     * @param invoice the entity to save
     * @return the persisted entity
     */
    public Invoice save(Invoice invoice) {
        log.debug("Request to save Invoice : {}", invoice);
        return invoiceRepository.save(invoice);
    }

    /**
     * Get all the invoices.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Invoice> findAll(Pageable pageable) {
        log.debug("Request to get all Invoices");
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            return invoiceRepository.findAll(pageable);
        } else
            return invoiceRepository.findAllByOrderCustomerUserLogin(
                SecurityUtils.getCurrentUserLogin().get(),
                pageable
            );
    }

    /**
     * Get one invoice by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Invoice findOne(Long id) {
        log.debug("Request to get Invoice : {}", id);
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            return invoiceRepository.findOne(id);
        } else
            return invoiceRepository.findOneByIdAndOrderCustomerUserLogin(
                id,
                SecurityUtils.getCurrentUserLogin().get()
            );
    }

    /**
     * Delete the invoice by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Invoice : {}", id);
        invoiceRepository.delete(id);
    }
}
