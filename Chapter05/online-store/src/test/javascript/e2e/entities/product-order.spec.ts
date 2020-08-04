import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProductOrder e2e test', () => {

    let navBarPage: NavBarPage;
    let productOrderDialogPage: ProductOrderDialogPage;
    let productOrderComponentsPage: ProductOrderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProductOrders', () => {
        navBarPage.goToEntity('product-order');
        productOrderComponentsPage = new ProductOrderComponentsPage();
        expect(productOrderComponentsPage.getTitle())
            .toMatch(/storeApp.productOrder.home.title/);

    });

    it('should load create ProductOrder dialog', () => {
        productOrderComponentsPage.clickOnCreateButton();
        productOrderDialogPage = new ProductOrderDialogPage();
        expect(productOrderDialogPage.getModalTitle())
            .toMatch(/storeApp.productOrder.home.createOrEditLabel/);
        productOrderDialogPage.close();
    });

   /* it('should create and save ProductOrders', () => {
        productOrderComponentsPage.clickOnCreateButton();
        productOrderDialogPage.setPlacedDateInput(12310020012301);
        expect(productOrderDialogPage.getPlacedDateInput()).toMatch('2001-12-31T02:30');
        productOrderDialogPage.statusSelectLastOption();
        productOrderDialogPage.setCodeInput('code');
        expect(productOrderDialogPage.getCodeInput()).toMatch('code');
        productOrderDialogPage.customerSelectLastOption();
        productOrderDialogPage.save();
        expect(productOrderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductOrderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product-order div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductOrderDialogPage {
    modalTitle = element(by.css('h4#myProductOrderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    placedDateInput = element(by.css('input#field_placedDate'));
    statusSelect = element(by.css('select#field_status'));
    codeInput = element(by.css('input#field_code'));
    customerSelect = element(by.css('select#field_customer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPlacedDateInput = function(placedDate) {
        this.placedDateInput.sendKeys(placedDate);
    }

    getPlacedDateInput = function() {
        return this.placedDateInput.getAttribute('value');
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
    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    }

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
    }

    customerSelectLastOption = function() {
        this.customerSelect.all(by.tagName('option')).last().click();
    }

    customerSelectOption = function(option) {
        this.customerSelect.sendKeys(option);
    }

    getCustomerSelect = function() {
        return this.customerSelect;
    }

    getCustomerSelectedOption = function() {
        return this.customerSelect.element(by.css('option:checked')).getText();
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
