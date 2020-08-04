import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Invoice e2e test', () => {

    let navBarPage: NavBarPage;
    let invoiceDialogPage: InvoiceDialogPage;
    let invoiceComponentsPage: InvoiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Invoices', () => {
        navBarPage.goToEntity('invoice');
        invoiceComponentsPage = new InvoiceComponentsPage();
        expect(invoiceComponentsPage.getTitle())
            .toMatch(/storeApp.invoice.home.title/);

    });

    it('should load create Invoice dialog', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceDialogPage = new InvoiceDialogPage();
        expect(invoiceDialogPage.getModalTitle())
            .toMatch(/storeApp.invoice.home.createOrEditLabel/);
        invoiceDialogPage.close();
    });

   /* it('should create and save Invoices', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceDialogPage.setCodeInput('code');
        expect(invoiceDialogPage.getCodeInput()).toMatch('code');
        invoiceDialogPage.setDateInput(12310020012301);
        expect(invoiceDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        invoiceDialogPage.setDetailsInput('details');
        expect(invoiceDialogPage.getDetailsInput()).toMatch('details');
        invoiceDialogPage.statusSelectLastOption();
        invoiceDialogPage.paymentMethodSelectLastOption();
        invoiceDialogPage.setPaymentDateInput(12310020012301);
        expect(invoiceDialogPage.getPaymentDateInput()).toMatch('2001-12-31T02:30');
        invoiceDialogPage.setPaymentAmountInput('5');
        expect(invoiceDialogPage.getPaymentAmountInput()).toMatch('5');
        invoiceDialogPage.orderSelectLastOption();
        invoiceDialogPage.save();
        expect(invoiceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InvoiceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InvoiceDialogPage {
    modalTitle = element(by.css('h4#myInvoiceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    dateInput = element(by.css('input#field_date'));
    detailsInput = element(by.css('input#field_details'));
    statusSelect = element(by.css('select#field_status'));
    paymentMethodSelect = element(by.css('select#field_paymentMethod'));
    paymentDateInput = element(by.css('input#field_paymentDate'));
    paymentAmountInput = element(by.css('input#field_paymentAmount'));
    orderSelect = element(by.css('select#field_order'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    }

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
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

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    }

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
    }
    setPaymentMethodSelect = function(paymentMethod) {
        this.paymentMethodSelect.sendKeys(paymentMethod);
    }

    getPaymentMethodSelect = function() {
        return this.paymentMethodSelect.element(by.css('option:checked')).getText();
    }

    paymentMethodSelectLastOption = function() {
        this.paymentMethodSelect.all(by.tagName('option')).last().click();
    }
    setPaymentDateInput = function(paymentDate) {
        this.paymentDateInput.sendKeys(paymentDate);
    }

    getPaymentDateInput = function() {
        return this.paymentDateInput.getAttribute('value');
    }

    setPaymentAmountInput = function(paymentAmount) {
        this.paymentAmountInput.sendKeys(paymentAmount);
    }

    getPaymentAmountInput = function() {
        return this.paymentAmountInput.getAttribute('value');
    }

    orderSelectLastOption = function() {
        this.orderSelect.all(by.tagName('option')).last().click();
    }

    orderSelectOption = function(option) {
        this.orderSelect.sendKeys(option);
    }

    getOrderSelect = function() {
        return this.orderSelect;
    }

    getOrderSelectedOption = function() {
        return this.orderSelect.element(by.css('option:checked')).getText();
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
