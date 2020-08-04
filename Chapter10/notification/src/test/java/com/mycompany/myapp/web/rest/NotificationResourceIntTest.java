package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.NotificationApp;

import com.mycompany.myapp.domain.Notification;
import com.mycompany.myapp.repository.NotificationRepository;
import com.mycompany.myapp.service.NotificationService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.NotificationType;
/**
 * Test class for the NotificationResource REST controller.
 *
 * @see NotificationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NotificationApp.class)
public class NotificationResourceIntTest {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    private static final Instant DEFAULT_SENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final NotificationType DEFAULT_FORMAT = NotificationType.EMAIL;
    private static final NotificationType UPDATED_FORMAT = NotificationType.SMS;

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    private static final Long DEFAULT_PRODUCT_ID = 1L;
    private static final Long UPDATED_PRODUCT_ID = 2L;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restNotificationMockMvc;

    private Notification notification;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NotificationResource notificationResource = new NotificationResource(notificationService);
        this.restNotificationMockMvc = MockMvcBuilders.standaloneSetup(notificationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Notification createEntity() {
        Notification notification = new Notification()
            .date(DEFAULT_DATE)
            .details(DEFAULT_DETAILS)
            .sentDate(DEFAULT_SENT_DATE)
            .format(DEFAULT_FORMAT)
            .userId(DEFAULT_USER_ID)
            .productId(DEFAULT_PRODUCT_ID);
        return notification;
    }

    @Before
    public void initTest() {
        notificationRepository.deleteAll();
        notification = createEntity();
    }

    @Test
    public void createNotification() throws Exception {
        int databaseSizeBeforeCreate = notificationRepository.findAll().size();

        // Create the Notification
        restNotificationMockMvc.perform(post("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isCreated());

        // Validate the Notification in the database
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeCreate + 1);
        Notification testNotification = notificationList.get(notificationList.size() - 1);
        assertThat(testNotification.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testNotification.getDetails()).isEqualTo(DEFAULT_DETAILS);
        assertThat(testNotification.getSentDate()).isEqualTo(DEFAULT_SENT_DATE);
        assertThat(testNotification.getFormat()).isEqualTo(DEFAULT_FORMAT);
        assertThat(testNotification.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testNotification.getProductId()).isEqualTo(DEFAULT_PRODUCT_ID);
    }

    @Test
    public void createNotificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = notificationRepository.findAll().size();

        // Create the Notification with an existing ID
        notification.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotificationMockMvc.perform(post("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isBadRequest());

        // Validate the Notification in the database
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = notificationRepository.findAll().size();
        // set the field null
        notification.setDate(null);

        // Create the Notification, which fails.

        restNotificationMockMvc.perform(post("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isBadRequest());

        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkSentDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = notificationRepository.findAll().size();
        // set the field null
        notification.setSentDate(null);

        // Create the Notification, which fails.

        restNotificationMockMvc.perform(post("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isBadRequest());

        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFormatIsRequired() throws Exception {
        int databaseSizeBeforeTest = notificationRepository.findAll().size();
        // set the field null
        notification.setFormat(null);

        // Create the Notification, which fails.

        restNotificationMockMvc.perform(post("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isBadRequest());

        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkUserIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = notificationRepository.findAll().size();
        // set the field null
        notification.setUserId(null);

        // Create the Notification, which fails.

        restNotificationMockMvc.perform(post("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isBadRequest());

        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkProductIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = notificationRepository.findAll().size();
        // set the field null
        notification.setProductId(null);

        // Create the Notification, which fails.

        restNotificationMockMvc.perform(post("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isBadRequest());

        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllNotifications() throws Exception {
        // Initialize the database
        notificationRepository.save(notification);

        // Get all the notificationList
        restNotificationMockMvc.perform(get("/api/notifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notification.getId())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS.toString())))
            .andExpect(jsonPath("$.[*].sentDate").value(hasItem(DEFAULT_SENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].format").value(hasItem(DEFAULT_FORMAT.toString())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].productId").value(hasItem(DEFAULT_PRODUCT_ID.intValue())));
    }

    @Test
    public void getNotification() throws Exception {
        // Initialize the database
        notificationRepository.save(notification);

        // Get the notification
        restNotificationMockMvc.perform(get("/api/notifications/{id}", notification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(notification.getId()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS.toString()))
            .andExpect(jsonPath("$.sentDate").value(DEFAULT_SENT_DATE.toString()))
            .andExpect(jsonPath("$.format").value(DEFAULT_FORMAT.toString()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()))
            .andExpect(jsonPath("$.productId").value(DEFAULT_PRODUCT_ID.intValue()));
    }

    @Test
    public void getNonExistingNotification() throws Exception {
        // Get the notification
        restNotificationMockMvc.perform(get("/api/notifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateNotification() throws Exception {
        // Initialize the database
        notificationService.save(notification);

        int databaseSizeBeforeUpdate = notificationRepository.findAll().size();

        // Update the notification
        Notification updatedNotification = notificationRepository.findOne(notification.getId());
        updatedNotification
            .date(UPDATED_DATE)
            .details(UPDATED_DETAILS)
            .sentDate(UPDATED_SENT_DATE)
            .format(UPDATED_FORMAT)
            .userId(UPDATED_USER_ID)
            .productId(UPDATED_PRODUCT_ID);

        restNotificationMockMvc.perform(put("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNotification)))
            .andExpect(status().isOk());

        // Validate the Notification in the database
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeUpdate);
        Notification testNotification = notificationList.get(notificationList.size() - 1);
        assertThat(testNotification.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testNotification.getDetails()).isEqualTo(UPDATED_DETAILS);
        assertThat(testNotification.getSentDate()).isEqualTo(UPDATED_SENT_DATE);
        assertThat(testNotification.getFormat()).isEqualTo(UPDATED_FORMAT);
        assertThat(testNotification.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testNotification.getProductId()).isEqualTo(UPDATED_PRODUCT_ID);
    }

    @Test
    public void updateNonExistingNotification() throws Exception {
        int databaseSizeBeforeUpdate = notificationRepository.findAll().size();

        // Create the Notification

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNotificationMockMvc.perform(put("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isCreated());

        // Validate the Notification in the database
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteNotification() throws Exception {
        // Initialize the database
        notificationService.save(notification);

        int databaseSizeBeforeDelete = notificationRepository.findAll().size();

        // Get the notification
        restNotificationMockMvc.perform(delete("/api/notifications/{id}", notification.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Notification.class);
        Notification notification1 = new Notification();
        notification1.setId("id1");
        Notification notification2 = new Notification();
        notification2.setId(notification1.getId());
        assertThat(notification1).isEqualTo(notification2);
        notification2.setId("id2");
        assertThat(notification1).isNotEqualTo(notification2);
        notification1.setId(null);
        assertThat(notification1).isNotEqualTo(notification2);
    }
}
