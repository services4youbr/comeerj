import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Turma e2e test', () => {

    let navBarPage: NavBarPage;
    let turmaDialogPage: TurmaDialogPage;
    let turmaComponentsPage: TurmaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Turmas', () => {
        navBarPage.goToEntity('turma-comeerj');
        turmaComponentsPage = new TurmaComponentsPage();
        expect(turmaComponentsPage.getTitle())
            .toMatch(/comeerjApp.turma.home.title/);

    });

    it('should load create Turma dialog', () => {
        turmaComponentsPage.clickOnCreateButton();
        turmaDialogPage = new TurmaDialogPage();
        expect(turmaDialogPage.getModalTitle())
            .toMatch(/comeerjApp.turma.home.createOrEditLabel/);
        turmaDialogPage.close();
    });

    it('should create and save Turmas', () => {
        turmaComponentsPage.clickOnCreateButton();
        turmaDialogPage.setNomeInput('nome');
        expect(turmaDialogPage.getNomeInput()).toMatch('nome');
        turmaDialogPage.faixaEtariaSelectLastOption();
        turmaDialogPage.save();
        expect(turmaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TurmaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-turma-comeerj div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TurmaDialogPage {
    modalTitle = element(by.css('h4#myTurmaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    faixaEtariaSelect = element(by.css('select#field_faixaEtaria'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    faixaEtariaSelectLastOption = function() {
        this.faixaEtariaSelect.all(by.tagName('option')).last().click();
    };

    faixaEtariaSelectOption = function(option) {
        this.faixaEtariaSelect.sendKeys(option);
    };

    getFaixaEtariaSelect = function() {
        return this.faixaEtariaSelect;
    };

    getFaixaEtariaSelectedOption = function() {
        return this.faixaEtariaSelect.element(by.css('option:checked')).getText();
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
