import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Shipment e2e test', () => {

    let navBarPage: NavBarPage;
    let shipmentDialogPage: ShipmentDialogPage;
    let shipmentComponentsPage: ShipmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Shipments', () => {
        navBarPage.goToEntity('shipment');
        shipmentComponentsPage = new ShipmentComponentsPage();
        expect(shipmentComponentsPage.getTitle())
            .toMatch(/storeApp.shipment.home.title/);

    });

    it('should load create Shipment dialog', () => {
        shipmentComponentsPage.clickOnCreateButton();
        shipmentDialogPage = new ShipmentDialogPage();
        expect(shipmentDialogPage.getModalTitle())
            .toMatch(/storeApp.shipment.home.createOrEditLabel/);
        shipmentDialogPage.close();
    });

   /* it('should create and save Shipments', () => {
        shipmentComponentsPage.clickOnCreateButton();
        shipmentDialogPage.setTrackingCodeInput('trackingCode');
        expect(shipmentDialogPage.getTrackingCodeInput()).toMatch('trackingCode');
        shipmentDialogPage.setDateInput(12310020012301);
        expect(shipmentDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        shipmentDialogPage.setDetailsInput('details');
        expect(shipmentDialogPage.getDetailsInput()).toMatch('details');
        shipmentDialogPage.invoiceSelectLastOption();
        shipmentDialogPage.save();
        expect(shipmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ShipmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-shipment div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ShipmentDialogPage {
    modalTitle = element(by.css('h4#myShipmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    trackingCodeInput = element(by.css('input#field_trackingCode'));
    dateInput = element(by.css('input#field_date'));
    detailsInput = element(by.css('input#field_details'));
    invoiceSelect = element(by.css('select#field_invoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTrackingCodeInput = function(trackingCode) {
        this.trackingCodeInput.sendKeys(trackingCode);
    }

    getTrackingCodeInput = function() {
        return this.trackingCodeInput.getAttribute('value');
    }

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    }

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    }

    setDetailsInput = function(details) {
        this.detailsInput.sendKeys(details);
    }

    getDetailsInput = function() {
        return this.detailsInput.getAttribute('value');
    }

    invoiceSelectLastOption = function() {
        this.invoiceSelect.all(by.tagName('option')).last().click();
    }

    invoiceSelectOption = function(option) {
        this.invoiceSelect.sendKeys(option);
    }

    getInvoiceSelect = function() {
        return this.invoiceSelect;
    }

    getInvoiceSelectedOption = function() {
        return this.invoiceSelect.element(by.css('option:checked')).getText();
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
