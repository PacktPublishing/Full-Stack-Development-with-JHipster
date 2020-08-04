import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProductCategory e2e test', () => {

    let navBarPage: NavBarPage;
    let productCategoryDialogPage: ProductCategoryDialogPage;
    let productCategoryComponentsPage: ProductCategoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProductCategories', () => {
        navBarPage.goToEntity('product-category');
        productCategoryComponentsPage = new ProductCategoryComponentsPage();
        expect(productCategoryComponentsPage.getTitle())
            .toMatch(/storeApp.productCategory.home.title/);

    });

    it('should load create ProductCategory dialog', () => {
        productCategoryComponentsPage.clickOnCreateButton();
        productCategoryDialogPage = new ProductCategoryDialogPage();
        expect(productCategoryDialogPage.getModalTitle())
            .toMatch(/storeApp.productCategory.home.createOrEditLabel/);
        productCategoryDialogPage.close();
    });

    it('should create and save ProductCategories', () => {
        productCategoryComponentsPage.clickOnCreateButton();
        productCategoryDialogPage.setNameInput('name');
        expect(productCategoryDialogPage.getNameInput()).toMatch('name');
        productCategoryDialogPage.setDescriptionInput('description');
        expect(productCategoryDialogPage.getDescriptionInput()).toMatch('description');
        productCategoryDialogPage.save();
        expect(productCategoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductCategoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product-category div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductCategoryDialogPage {
    modalTitle = element(by.css('h4#myProductCategoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));

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
