package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Notification;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Notification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {

}
