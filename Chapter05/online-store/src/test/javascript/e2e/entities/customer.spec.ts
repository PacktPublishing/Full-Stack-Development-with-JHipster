import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Customer e2e test', () => {

    let navBarPage: NavBarPage;
    let customerDialogPage: CustomerDialogPage;
    let customerComponentsPage: CustomerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle())
            .toMatch(/storeApp.customer.home.title/);

    });

    it('should load create Customer dialog', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage = new CustomerDialogPage();
        expect(customerDialogPage.getModalTitle())
            .toMatch(/storeApp.customer.home.createOrEditLabel/);
        customerDialogPage.close();
    });

   /* it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage.setFirstNameInput('firstName');
        expect(customerDialogPage.getFirstNameInput()).toMatch('firstName');
        customerDialogPage.setLastNameInput('lastName');
        expect(customerDialogPage.getLastNameInput()).toMatch('lastName');
        customerDialogPage.genderSelectLastOption();
        customerDialogPage.setEmailInput('email');
        expect(customerDialogPage.getEmailInput()).toMatch('email');
        customerDialogPage.setPhoneInput('phone');
        expect(customerDialogPage.getPhoneInput()).toMatch('phone');
        customerDialogPage.setAddressLine1Input('addressLine1');
        expect(customerDialogPage.getAddressLine1Input()).toMatch('addressLine1');
        customerDialogPage.setAddressLine2Input('addressLine2');
        expect(customerDialogPage.getAddressLine2Input()).toMatch('addressLine2');
        customerDialogPage.setCityInput('city');
        expect(customerDialogPage.getCityInput()).toMatch('city');
        customerDialogPage.setCountryInput('country');
        expect(customerDialogPage.getCountryInput()).toMatch('country');
        customerDialogPage.userSelectLastOption();
        customerDialogPage.save();
        expect(customerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerDialogPage {
    modalTitle = element(by.css('h4#myCustomerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    genderSelect = element(by.css('select#field_gender'));
    emailInput = element(by.css('input#field_email'));
    phoneInput = element(by.css('input#field_phone'));
    addressLine1Input = element(by.css('input#field_addressLine1'));
    addressLine2Input = element(by.css('input#field_addressLine2'));
    cityInput = element(by.css('input#field_city'));
    countryInput = element(by.css('input#field_country'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function(lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function() {
        return this.lastNameInput.getAttribute('value');
    }

    setGenderSelect = function(gender) {
        this.genderSelect.sendKeys(gender);
    }

    getGenderSelect = function() {
        return this.genderSelect.element(by.css('option:checked')).getText();
    }

    genderSelectLastOption = function() {
        this.genderSelect.all(by.tagName('option')).last().click();
    }
    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    setPhoneInput = function(phone) {
        this.phoneInput.sendKeys(phone);
    }

    getPhoneInput = function() {
        return this.phoneInput.getAttribute('value');
    }

    setAddressLine1Input = function(addressLine1) {
        this.addressLine1Input.sendKeys(addressLine1);
    }

    getAddressLine1Input = function() {
        return this.addressLine1Input.getAttribute('value');
    }

    setAddressLine2Input = function(addressLine2) {
        this.addressLine2Input.sendKeys(addressLine2);
    }

    getAddressLine2Input = function() {
        return this.addressLine2Input.getAttribute('value');
    }

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    }

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    }

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    }

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    }

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function() {
        return this.userSelect;
    }

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
