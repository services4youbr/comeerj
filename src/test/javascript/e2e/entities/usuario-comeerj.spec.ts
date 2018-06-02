import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Usuario e2e test', () => {

    let navBarPage: NavBarPage;
    let usuarioDialogPage: UsuarioDialogPage;
    let usuarioComponentsPage: UsuarioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Usuarios', () => {
        navBarPage.goToEntity('usuario-comeerj');
        usuarioComponentsPage = new UsuarioComponentsPage();
        expect(usuarioComponentsPage.getTitle())
            .toMatch(/Usuarios/);

    });

    it('should load create Usuario dialog', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage = new UsuarioDialogPage();
        expect(usuarioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Usuario/);
        usuarioDialogPage.close();
    });

    it('should create and save Usuarios', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage.setUserIdInput('5');
        expect(usuarioDialogPage.getUserIdInput()).toMatch('5');
        usuarioDialogPage.setNameInput('name');
        expect(usuarioDialogPage.getNameInput()).toMatch('name');
        usuarioDialogPage.setEmailInput('email');
        expect(usuarioDialogPage.getEmailInput()).toMatch('email');
        usuarioDialogPage.perfilSelectLastOption();
        usuarioDialogPage.generoSelectLastOption();
        usuarioDialogPage.save();
        expect(usuarioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UsuarioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-usuario-comeerj div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class UsuarioDialogPage {
    modalTitle = element(by.css('h4#myUsuarioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userIdInput = element(by.css('input#field_userId'));
    nameInput = element(by.css('input#field_name'));
    emailInput = element(by.css('input#field_email'));
    perfilSelect = element(by.css('select#field_perfil'));
    generoSelect = element(by.css('select#field_genero'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setUserIdInput = function(userId) {
        this.userIdInput.sendKeys(userId);
    };

    getUserIdInput = function() {
        return this.userIdInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setPerfilSelect = function(perfil) {
        this.perfilSelect.sendKeys(perfil);
    };

    getPerfilSelect = function() {
        return this.perfilSelect.element(by.css('option:checked')).getText();
    };

    perfilSelectLastOption = function() {
        this.perfilSelect.all(by.tagName('option')).last().click();
    };
    setGeneroSelect = function(genero) {
        this.generoSelect.sendKeys(genero);
    };

    getGeneroSelect = function() {
        return this.generoSelect.element(by.css('option:checked')).getText();
    };

    generoSelectLastOption = function() {
        this.generoSelect.all(by.tagName('option')).last().click();
    };
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
