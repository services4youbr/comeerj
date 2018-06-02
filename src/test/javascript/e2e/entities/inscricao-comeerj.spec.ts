import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Inscricao e2e test', () => {

    let navBarPage: NavBarPage;
    let inscricaoDialogPage: InscricaoDialogPage;
    let inscricaoComponentsPage: InscricaoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Inscricaos', () => {
        navBarPage.goToEntity('inscricao-comeerj');
        inscricaoComponentsPage = new InscricaoComponentsPage();
        expect(inscricaoComponentsPage.getTitle())
            .toMatch(/Inscricaos/);

    });

    it('should load create Inscricao dialog', () => {
        inscricaoComponentsPage.clickOnCreateButton();
        inscricaoDialogPage = new InscricaoDialogPage();
        expect(inscricaoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Inscricao/);
        inscricaoDialogPage.close();
    });

    it('should create and save Inscricaos', () => {
        inscricaoComponentsPage.clickOnCreateButton();
        inscricaoDialogPage.setNomeInput('nome');
        expect(inscricaoDialogPage.getNomeInput()).toMatch('nome');
        inscricaoDialogPage.tipoParticipacaoSelectLastOption();
        inscricaoDialogPage.setIdadeInput('5');
        expect(inscricaoDialogPage.getIdadeInput()).toMatch('5');
        inscricaoDialogPage.setNumeroParticipacoesInput('5');
        expect(inscricaoDialogPage.getNumeroParticipacoesInput()).toMatch('5');
        inscricaoDialogPage.poloSelectLastOption();
        inscricaoDialogPage.eventoSelectLastOption();
        inscricaoDialogPage.comissaoSelectLastOption();
        inscricaoDialogPage.usuarioSelectLastOption();
        inscricaoDialogPage.turmaSelectLastOption();
        inscricaoDialogPage.responsavelSelectLastOption();
        inscricaoDialogPage.alojamentoSelectLastOption();
        inscricaoDialogPage.save();
        expect(inscricaoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InscricaoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-inscricao-comeerj div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class InscricaoDialogPage {
    modalTitle = element(by.css('h4#myInscricaoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    tipoParticipacaoSelect = element(by.css('select#field_tipoParticipacao'));
    idadeInput = element(by.css('input#field_idade'));
    numeroParticipacoesInput = element(by.css('input#field_numeroParticipacoes'));
    poloSelect = element(by.css('select#field_polo'));
    eventoSelect = element(by.css('select#field_evento'));
    comissaoSelect = element(by.css('select#field_comissao'));
    usuarioSelect = element(by.css('select#field_usuario'));
    turmaSelect = element(by.css('select#field_turma'));
    responsavelSelect = element(by.css('select#field_responsavel'));
    alojamentoSelect = element(by.css('select#field_alojamento'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    setTipoParticipacaoSelect = function(tipoParticipacao) {
        this.tipoParticipacaoSelect.sendKeys(tipoParticipacao);
    };

    getTipoParticipacaoSelect = function() {
        return this.tipoParticipacaoSelect.element(by.css('option:checked')).getText();
    };

    tipoParticipacaoSelectLastOption = function() {
        this.tipoParticipacaoSelect.all(by.tagName('option')).last().click();
    };
    setIdadeInput = function(idade) {
        this.idadeInput.sendKeys(idade);
    };

    getIdadeInput = function() {
        return this.idadeInput.getAttribute('value');
    };

    setNumeroParticipacoesInput = function(numeroParticipacoes) {
        this.numeroParticipacoesInput.sendKeys(numeroParticipacoes);
    };

    getNumeroParticipacoesInput = function() {
        return this.numeroParticipacoesInput.getAttribute('value');
    };

    poloSelectLastOption = function() {
        this.poloSelect.all(by.tagName('option')).last().click();
    };

    poloSelectOption = function(option) {
        this.poloSelect.sendKeys(option);
    };

    getPoloSelect = function() {
        return this.poloSelect;
    };

    getPoloSelectedOption = function() {
        return this.poloSelect.element(by.css('option:checked')).getText();
    };

    eventoSelectLastOption = function() {
        this.eventoSelect.all(by.tagName('option')).last().click();
    };

    eventoSelectOption = function(option) {
        this.eventoSelect.sendKeys(option);
    };

    getEventoSelect = function() {
        return this.eventoSelect;
    };

    getEventoSelectedOption = function() {
        return this.eventoSelect.element(by.css('option:checked')).getText();
    };

    comissaoSelectLastOption = function() {
        this.comissaoSelect.all(by.tagName('option')).last().click();
    };

    comissaoSelectOption = function(option) {
        this.comissaoSelect.sendKeys(option);
    };

    getComissaoSelect = function() {
        return this.comissaoSelect;
    };

    getComissaoSelectedOption = function() {
        return this.comissaoSelect.element(by.css('option:checked')).getText();
    };

    usuarioSelectLastOption = function() {
        this.usuarioSelect.all(by.tagName('option')).last().click();
    };

    usuarioSelectOption = function(option) {
        this.usuarioSelect.sendKeys(option);
    };

    getUsuarioSelect = function() {
        return this.usuarioSelect;
    };

    getUsuarioSelectedOption = function() {
        return this.usuarioSelect.element(by.css('option:checked')).getText();
    };

    turmaSelectLastOption = function() {
        this.turmaSelect.all(by.tagName('option')).last().click();
    };

    turmaSelectOption = function(option) {
        this.turmaSelect.sendKeys(option);
    };

    getTurmaSelect = function() {
        return this.turmaSelect;
    };

    getTurmaSelectedOption = function() {
        return this.turmaSelect.element(by.css('option:checked')).getText();
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

    alojamentoSelectLastOption = function() {
        this.alojamentoSelect.all(by.tagName('option')).last().click();
    };

    alojamentoSelectOption = function(option) {
        this.alojamentoSelect.sendKeys(option);
    };

    getAlojamentoSelect = function() {
        return this.alojamentoSelect;
    };

    getAlojamentoSelectedOption = function() {
        return this.alojamentoSelect.element(by.css('option:checked')).getText();
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
