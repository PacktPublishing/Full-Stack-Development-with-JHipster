package com.mycompany.store.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mycompany.store.domain.Invoice;


/**
 * Spring Data JPA repository for the Invoice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    Page<Invoice> findAllByOrderCustomerUserLogin(String login, Pageable pageable);

    Invoice findOneByIdAndOrderCustomerUserLogin(Long id, String login);
}
