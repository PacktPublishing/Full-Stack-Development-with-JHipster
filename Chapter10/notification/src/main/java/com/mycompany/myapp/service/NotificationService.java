package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Notification;
import com.mycompany.myapp.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Notification.
 */
@Service
public class NotificationService {

    private final Logger log = LoggerFactory.getLogger(NotificationService.class);

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Save a notification.
     *
     * @param notification the entity to save
     * @return the persisted entity
     */
    public Notification save(Notification notification) {
        log.debug("Request to save Notification : {}", notification);
        return notificationRepository.save(notification);
    }

    /**
     * Get all the notifications.
     *
     * @return the list of entities
     */
    public List<Notification> findAll() {
        log.debug("Request to get all Notifications");
        return notificationRepository.findAll();
    }

    /**
     * Get one notification by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Notification findOne(String id) {
        log.debug("Request to get Notification : {}", id);
        return notificationRepository.findOne(id);
    }

    /**
     * Delete the notification by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Notification : {}", id);
        notificationRepository.delete(id);
    }
}
