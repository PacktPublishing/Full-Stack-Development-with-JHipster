package com.mycompany.store.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mycompany.store.domain.Shipment;


/**
 * Spring Data JPA repository for the Shipment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {

    Page<Shipment> findAllByInvoiceOrderCustomerUserLogin(String login, Pageable pageable);

    Shipment findOneByIdAndInvoiceOrderCustomerUserLogin(Long id, String login);
}
