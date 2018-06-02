import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Alojamento e2e test', () => {

    let navBarPage: NavBarPage;
    let alojamentoDialogPage: AlojamentoDialogPage;
    let alojamentoComponentsPage: AlojamentoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Alojamentos', () => {
        navBarPage.goToEntity('alojamento-comeerj');
        alojamentoComponentsPage = new AlojamentoComponentsPage();
        expect(alojamentoComponentsPage.getTitle())
            .toMatch(/Alojamentos/);

    });

    it('should load create Alojamento dialog', () => {
        alojamentoComponentsPage.clickOnCreateButton();
        alojamentoDialogPage = new AlojamentoDialogPage();
        expect(alojamentoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Alojamento/);
        alojamentoDialogPage.close();
    });

    it('should create and save Alojamentos', () => {
        alojamentoComponentsPage.clickOnCreateButton();
        alojamentoDialogPage.setNomeInput('nome');
        expect(alojamentoDialogPage.getNomeInput()).toMatch('nome');
        alojamentoDialogPage.setSalaInput('sala');
        expect(alojamentoDialogPage.getSalaInput()).toMatch('sala');
        alojamentoDialogPage.setLocalInput('local');
        expect(alojamentoDialogPage.getLocalInput()).toMatch('local');
        alojamentoDialogPage.generoSelectLastOption();
        alojamentoDialogPage.responsavelSelectLastOption();
        alojamentoDialogPage.save();
        expect(alojamentoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AlojamentoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-alojamento-comeerj div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AlojamentoDialogPage {
    modalTitle = element(by.css('h4#myAlojamentoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    salaInput = element(by.css('input#field_sala'));
    localInput = element(by.css('input#field_local'));
    generoSelect = element(by.css('select#field_genero'));
    responsavelSelect = element(by.css('select#field_responsavel'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    setSalaInput = function(sala) {
        this.salaInput.sendKeys(sala);
    };

    getSalaInput = function() {
        return this.salaInput.getAttribute('value');
    };

    setLocalInput = function(local) {
        this.localInput.sendKeys(local);
    };

    getLocalInput = function() {
        return this.localInput.getAttribute('value');
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
    responsavelSelectLastOption = function() {
        this.responsavelSelect.all(by.tagName('option')).last().click();
    };

    responsavelSelectOption = function(option) {
        this.responsavelSelect.sendKeys(option);
    };

    getResponsavelSelect = function() {
        return this.responsavelSelect;
    };

    getResponsavelSelectedOption = function() {
        return this.responsavelSelect.element(by.css('option:checked')).getText();
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
