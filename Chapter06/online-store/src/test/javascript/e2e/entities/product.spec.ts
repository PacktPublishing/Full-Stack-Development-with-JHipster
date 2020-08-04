import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Product e2e test', () => {

    let navBarPage: NavBarPage;
    let productDialogPage: ProductDialogPage;
    let productComponentsPage: ProductComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle())
            .toMatch(/storeApp.product.home.title/);

    });

    it('should load create Product dialog', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage = new ProductDialogPage();
        expect(productDialogPage.getModalTitle())
            .toMatch(/storeApp.product.home.createOrEditLabel/);
        productDialogPage.close();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage.setNameInput('name');
        expect(productDialogPage.getNameInput()).toMatch('name');
        productDialogPage.setDescriptionInput('description');
        expect(productDialogPage.getDescriptionInput()).toMatch('description');
        productDialogPage.setPriceInput('5');
        expect(productDialogPage.getPriceInput()).toMatch('5');
        productDialogPage.sizeSelectLastOption();
        productDialogPage.setImageInput(absolutePath);
        productDialogPage.productCategorySelectLastOption();
        productDialogPage.save();
        expect(productDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductDialogPage {
    modalTitle = element(by.css('h4#myProductLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    priceInput = element(by.css('input#field_price'));
    sizeSelect = element(by.css('select#field_size'));
    imageInput = element(by.css('input#file_image'));
    productCategorySelect = element(by.css('select#field_productCategory'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    }

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    }

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    }

    setSizeSelect = function(size) {
        this.sizeSelect.sendKeys(size);
    }

    getSizeSelect = function() {
        return this.sizeSelect.element(by.css('option:checked')).getText();
    }

    sizeSelectLastOption = function() {
        this.sizeSelect.all(by.tagName('option')).last().click();
    }
    setImageInput = function(image) {
        this.imageInput.sendKeys(image);
    }

    getImageInput = function() {
        return this.imageInput.getAttribute('value');
    }

    productCategorySelectLastOption = function() {
        this.productCategorySelect.all(by.tagName('option')).last().click();
    }

    productCategorySelectOption = function(option) {
        this.productCategorySelect.sendKeys(option);
    }

    getProductCategorySelect = function() {
        return this.productCategorySelect;
    }

    getProductCategorySelectedOption = function() {
        return this.productCategorySelect.element(by.css('option:checked')).getText();
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
