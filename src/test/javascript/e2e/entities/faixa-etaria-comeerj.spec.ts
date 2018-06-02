import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('FaixaEtaria e2e test', () => {

    let navBarPage: NavBarPage;
    let faixaEtariaDialogPage: FaixaEtariaDialogPage;
    let faixaEtariaComponentsPage: FaixaEtariaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load FaixaEtarias', () => {
        navBarPage.goToEntity('faixa-etaria-comeerj');
        faixaEtariaComponentsPage = new FaixaEtariaComponentsPage();
        expect(faixaEtariaComponentsPage.getTitle())
            .toMatch(/Faixa Etarias/);

    });

    it('should load create FaixaEtaria dialog', () => {
        faixaEtariaComponentsPage.clickOnCreateButton();
        faixaEtariaDialogPage = new FaixaEtariaDialogPage();
        expect(faixaEtariaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Faixa Etaria/);
        faixaEtariaDialogPage.close();
    });

    it('should create and save FaixaEtarias', () => {
        faixaEtariaComponentsPage.clickOnCreateButton();
        faixaEtariaDialogPage.setNomeInput('nome');
        expect(faixaEtariaDialogPage.getNomeInput()).toMatch('nome');
        faixaEtariaDialogPage.setIdadeMinInput('5');
        expect(faixaEtariaDialogPage.getIdadeMinInput()).toMatch('5');
        faixaEtariaDialogPage.setIdadeMaximaInput('5');
        expect(faixaEtariaDialogPage.getIdadeMaximaInput()).toMatch('5');
        faixaEtariaDialogPage.setDescricaoInput('descricao');
        expect(faixaEtariaDialogPage.getDescricaoInput()).toMatch('descricao');
        faixaEtariaDialogPage.save();
        expect(faixaEtariaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FaixaEtariaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-faixa-etaria-comeerj div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class FaixaEtariaDialogPage {
    modalTitle = element(by.css('h4#myFaixaEtariaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    idadeMinInput = element(by.css('input#field_idadeMin'));
    idadeMaximaInput = element(by.css('input#field_idadeMaxima'));
    descricaoInput = element(by.css('input#field_descricao'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    setIdadeMinInput = function(idadeMin) {
        this.idadeMinInput.sendKeys(idadeMin);
    };

    getIdadeMinInput = function() {
        return this.idadeMinInput.getAttribute('value');
    };

    setIdadeMaximaInput = function(idadeMaxima) {
        this.idadeMaximaInput.sendKeys(idadeMaxima);
    };

    getIdadeMaximaInput = function() {
        return this.idadeMaximaInput.getAttribute('value');
    };

    setDescricaoInput = function(descricao) {
        this.descricaoInput.sendKeys(descricao);
    };

    getDescricaoInput = function() {
        return this.descricaoInput.getAttribute('value');
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
