import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Polo e2e test', () => {

    let navBarPage: NavBarPage;
    let poloDialogPage: PoloDialogPage;
    let poloComponentsPage: PoloComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Polos', () => {
        navBarPage.goToEntity('polo-comeerj');
        poloComponentsPage = new PoloComponentsPage();
        expect(poloComponentsPage.getTitle())
            .toMatch(/Polos/);

    });

    it('should load create Polo dialog', () => {
        poloComponentsPage.clickOnCreateButton();
        poloDialogPage = new PoloDialogPage();
        expect(poloDialogPage.getModalTitle())
            .toMatch(/Create or edit a Polo/);
        poloDialogPage.close();
    });

    it('should create and save Polos', () => {
        poloComponentsPage.clickOnCreateButton();
        poloDialogPage.setNomeInput('nome');
        expect(poloDialogPage.getNomeInput()).toMatch('nome');
        poloDialogPage.setNumeroInput('numero');
        expect(poloDialogPage.getNumeroInput()).toMatch('numero');
        poloDialogPage.setReunirInput('reunir');
        expect(poloDialogPage.getReunirInput()).toMatch('reunir');
        poloDialogPage.setLocalizacaoInput('localizacao');
        expect(poloDialogPage.getLocalizacaoInput()).toMatch('localizacao');
        poloDialogPage.save();
        expect(poloDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PoloComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-polo-comeerj div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PoloDialogPage {
    modalTitle = element(by.css('h4#myPoloLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    numeroInput = element(by.css('input#field_numero'));
    reunirInput = element(by.css('input#field_reunir'));
    localizacaoInput = element(by.css('input#field_localizacao'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    setNumeroInput = function(numero) {
        this.numeroInput.sendKeys(numero);
    };

    getNumeroInput = function() {
        return this.numeroInput.getAttribute('value');
    };

    setReunirInput = function(reunir) {
        this.reunirInput.sendKeys(reunir);
    };

    getReunirInput = function() {
        return this.reunirInput.getAttribute('value');
    };

    setLocalizacaoInput = function(localizacao) {
        this.localizacaoInput.sendKeys(localizacao);
    };

    getLocalizacaoInput = function() {
        return this.localizacaoInput.getAttribute('value');
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
