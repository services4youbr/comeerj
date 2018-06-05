import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Comissao e2e test', () => {

    let navBarPage: NavBarPage;
    let comissaoDialogPage: ComissaoDialogPage;
    let comissaoComponentsPage: ComissaoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Comissaos', () => {
        navBarPage.goToEntity('comissao-comeerj');
        comissaoComponentsPage = new ComissaoComponentsPage();
        expect(comissaoComponentsPage.getTitle())
            .toMatch(/comeerjApp.comissao.home.title/);

    });

    it('should load create Comissao dialog', () => {
        comissaoComponentsPage.clickOnCreateButton();
        comissaoDialogPage = new ComissaoDialogPage();
        expect(comissaoDialogPage.getModalTitle())
            .toMatch(/comeerjApp.comissao.home.createOrEditLabel/);
        comissaoDialogPage.close();
    });

    it('should create and save Comissaos', () => {
        comissaoComponentsPage.clickOnCreateButton();
        comissaoDialogPage.setComissaoInput('comissao');
        expect(comissaoDialogPage.getComissaoInput()).toMatch('comissao');
        comissaoDialogPage.setNomeInput('nome');
        expect(comissaoDialogPage.getNomeInput()).toMatch('nome');
        comissaoDialogPage.setDescricaoInput('descricao');
        expect(comissaoDialogPage.getDescricaoInput()).toMatch('descricao');
        comissaoDialogPage.save();
        expect(comissaoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ComissaoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-comissao-comeerj div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ComissaoDialogPage {
    modalTitle = element(by.css('h4#myComissaoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    comissaoInput = element(by.css('input#field_comissao'));
    nomeInput = element(by.css('input#field_nome'));
    descricaoInput = element(by.css('input#field_descricao'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setComissaoInput = function(comissao) {
        this.comissaoInput.sendKeys(comissao);
    };

    getComissaoInput = function() {
        return this.comissaoInput.getAttribute('value');
    };

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
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
