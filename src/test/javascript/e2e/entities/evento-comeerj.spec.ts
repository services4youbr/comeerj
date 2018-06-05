import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Evento e2e test', () => {

    let navBarPage: NavBarPage;
    let eventoDialogPage: EventoDialogPage;
    let eventoComponentsPage: EventoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Eventos', () => {
        navBarPage.goToEntity('evento-comeerj');
        eventoComponentsPage = new EventoComponentsPage();
        expect(eventoComponentsPage.getTitle())
            .toMatch(/comeerjApp.evento.home.title/);

    });

    it('should load create Evento dialog', () => {
        eventoComponentsPage.clickOnCreateButton();
        eventoDialogPage = new EventoDialogPage();
        expect(eventoDialogPage.getModalTitle())
            .toMatch(/comeerjApp.evento.home.createOrEditLabel/);
        eventoDialogPage.close();
    });

    it('should create and save Eventos', () => {
        eventoComponentsPage.clickOnCreateButton();
        eventoDialogPage.setVersaoInput('versao');
        expect(eventoDialogPage.getVersaoInput()).toMatch('versao');
        eventoDialogPage.setTemaInput('tema');
        expect(eventoDialogPage.getTemaInput()).toMatch('tema');
        eventoDialogPage.setInicioEventoInput(12310020012301);
        expect(eventoDialogPage.getInicioEventoInput()).toMatch('2001-12-31T02:30');
        eventoDialogPage.setFimEventoInput(12310020012301);
        expect(eventoDialogPage.getFimEventoInput()).toMatch('2001-12-31T02:30');
        eventoDialogPage.setInicioInscricoesInput(12310020012301);
        expect(eventoDialogPage.getInicioInscricoesInput()).toMatch('2001-12-31T02:30');
        eventoDialogPage.setFimInscricoesInput(12310020012301);
        expect(eventoDialogPage.getFimInscricoesInput()).toMatch('2001-12-31T02:30');
        eventoDialogPage.save();
        expect(eventoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EventoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-evento-comeerj div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EventoDialogPage {
    modalTitle = element(by.css('h4#myEventoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    versaoInput = element(by.css('input#field_versao'));
    temaInput = element(by.css('input#field_tema'));
    inicioEventoInput = element(by.css('input#field_inicioEvento'));
    fimEventoInput = element(by.css('input#field_fimEvento'));
    inicioInscricoesInput = element(by.css('input#field_inicioInscricoes'));
    fimInscricoesInput = element(by.css('input#field_fimInscricoes'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setVersaoInput = function(versao) {
        this.versaoInput.sendKeys(versao);
    };

    getVersaoInput = function() {
        return this.versaoInput.getAttribute('value');
    };

    setTemaInput = function(tema) {
        this.temaInput.sendKeys(tema);
    };

    getTemaInput = function() {
        return this.temaInput.getAttribute('value');
    };

    setInicioEventoInput = function(inicioEvento) {
        this.inicioEventoInput.sendKeys(inicioEvento);
    };

    getInicioEventoInput = function() {
        return this.inicioEventoInput.getAttribute('value');
    };

    setFimEventoInput = function(fimEvento) {
        this.fimEventoInput.sendKeys(fimEvento);
    };

    getFimEventoInput = function() {
        return this.fimEventoInput.getAttribute('value');
    };

    setInicioInscricoesInput = function(inicioInscricoes) {
        this.inicioInscricoesInput.sendKeys(inicioInscricoes);
    };

    getInicioInscricoesInput = function() {
        return this.inicioInscricoesInput.getAttribute('value');
    };

    setFimInscricoesInput = function(fimInscricoes) {
        this.fimInscricoesInput.sendKeys(fimInscricoes);
    };

    getFimInscricoesInput = function() {
        return this.fimInscricoesInput.getAttribute('value');
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
