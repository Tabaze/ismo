import { selectArticle } from '../ModeleArticle/component.js';
import { selectCateAct, templateCateAction } from '../ModeleBase/component.js';
import { listClient, listFournisseur, GenerateurCode, insertUpdateClient, insertUpdateFournisseur, listContact, listActionClient, listOfferClient, contactAddUp, contactById, ActionClientAddUp, ActionById, offerAddUp, listParcClient, parcById, parcAddUp, listEmailClient } from './service.js';

export function tableClient($input, columns_title) {
    let table = $input.randerTable(columns_title, listClient(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idClient);
            // $(row).css('background', data.codeColor)
            // $(row).css('color', 'black')
        }
    });
    return table;
}
export function tableFournisseur($input, columns_title) {
    let table = $input.randerTable(columns_title, listFournisseur(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idFournisseur);
        }
    });
    return table;
}
export function tableEmailClient($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listEmailClient(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idEmail);
        }
    }, {
        columnDefs: [
            {
                target: 2,
                visible: false,
            }
        ],
    });
    return table;
}
export function selectFournisseur($input) {
    let list = listFournisseur();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idFournisseur,
            text: obj.nomFournisseur + '( ' + obj.codeFournisseur + ' )',
            data: obj
        }
    });
    xdata.unshift({ id: '', text: '' });
    $input.select2({ data: xdata, placeholder: 'Fournisseur' });
}
export function selectClient($input) {
    let list = listClient();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idClient,
            text: obj.nomClient + '( ' + obj.codeClient + ' )',
            data: obj
        }
    });
    // xdata.unshift({ id: '', text: '' });
    $input.select2({ data: xdata, placeholder: 'Client' });
}
export function selectVendeur($input) {
    let list = listClient();
    let xdata = $.map(list, function (obj) {
        if (obj.vendeurClient)
            return {
                id: obj.idClient,
                text: obj.nomClient + '( ' + obj.codeClient + ' )',
                data: obj
            }
    });
    xdata.unshift({ id: -1, text: '' });
    $input.select2({ data: xdata, placeholder: 'Vendeur' });
}
export function selectFournisseurAll($input) {
    let list = listFournisseur();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idFournisseur,
            text: obj.nomFournisseur + '( ' + obj.codeFournisseur + ' )',
            data: obj
        }
    });
    xdata.unshift({ id: -1, text: 'Tous' });
    $input.select2({ data: xdata, placeholder: 'Fournisseur' });
}
export function selectClientAll($input) {
    let list = listClient();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idClient,
            text: obj.nomClient + '( ' + obj.codeClient + ' )',
            data: obj
        }
    });
    xdata.unshift({ id: -1, text: 'Tous' });
    $input.select2({ data: xdata, placeholder: 'Client' });
}
export function templateClientInsert($input) {
    let $modele = $(`<div role="dialog" class="modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Client</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
            <form class="needs-validation" id="formClient" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">                           
                        <div class="row m-0 mb-3 mt-4 align-items-center">
                            <div class="form-outline col-8 col-md-10">
                                <input type="text" id="codeClient" name="codeClient" class="form-control" required/>
                                <div class="invalid-feedback sty-feedback">
                                    Code Client est obligatoire
                                </div>
                                <label class="form-label" for="codeClient">Code Client</label>
                            </div>
                            <div class="col-2">
                                <span class="btn btn-secondary btn-input generateurCode"><i class="fa fa-lg fas fa-arrow-left"></i></span>
                            </div>            
                        </div>                                            
                        <div class="form-check mb-3 form-check-inline">
                            <input class="form-check-input" type="radio" name="typeClient" id="typeClient1" value="Particulier" />
                            <label class="form-check-label" for="typeClient1">Particulier</label>
                        </div>                                            
                        <div class="form-check mb-3 form-check-inline">
                            <input class="form-check-input" type="radio" name="typeClient" id="typeClient2" value="Société" checked/>
                            <label class="form-check-label" for="typeClient2">Société</label>
                        </div>
                        <div class="form-outline mb-3">
                            <input type="text" id="nomClient" name="nomClient" class="form-control" required/>
                            <div class="invalid-feedback sty-feedback">
                                Nom Client est obligatoire
                            </div>
                            <label class="form-label" for="nomClient">Nom Client</label>          
                        </div>                
                    </div>
                </span>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light btn-new d-none btn-rounded" role="insert">Nouveau</button>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                    <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                </div>
            </form>
        </div>
    </div>    
</div>`)
    $('body').append($modele);
    forms();
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).update();
    });
    $modele.find('#formClient').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($modele.data('update') && role.update()) {
                data.idClient = $modele.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateClient(param)[0];
                if (list.idClient) {
                    ittone.success('successfully');
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateClient(param)[0];
                if (list.idClient) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idClient);
                    $modele.data('update', true);

                }
            }
            selectClient($input);
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    $modele.find('.generateurCode').on('click', this, function () {
        let data = GenerateurCode({ statement: 'Client' });
        if (data.length) {
            let codeC = data[0].codeClient;
            codeC = parseInt(codeC.substring(2, codeC.length)) + 1;
            $('#codeClient').setVal("CL" + ittone.stringWithZero(codeC, 4));
        } else {
            $('#codeClient').setVal("CL0001");
        }
    });
}
export function templateFournisseurInsert($input) {
    let $modele = $(`<div role="dialog" class="modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Fournisseur</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
            <form class="needs-validation" id="formFournisseur" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">                           
                        <div class="row m-0 mb-3 mt-4 align-items-center">
                        <div class="form-outline col-8 col-md-10">
                        <input type="text" id="codeFournisseur" name="codeFournisseur" class="form-control" required/>
                        <div class="invalid-feedback sty-feedback">
                            Code Fournisseur est obligatoire
                        </div>
                        <label class="form-label" for="codeFournisseur">Code Fournisseur</label>
                    </div>
                    <div class="col-2">
                        <span class="btn btn-secondary btn-input generateurCode"><i class="fa fa-lg fas fa-arrow-left"></i></span>
                    </div>            
                </div>                                            
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="fournisseur" />
                    <label class="form-check-label" for="fournisseur">Fournisseur</label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="sous_traitance" />
                    <label class="form-check-label" for="sous_traitance">Sous-Traitance</label>
                </div>
                <div class="form-outline mb-3">
                    <input type="text" id="nomFournisseur" name="nomFournisseur" class="form-control" required/>
                    <div class="invalid-feedback sty-feedback">
                        Nom Fournisseur est obligatoire
                    </div>
                    <label class="form-label" for="nomFournisseur">Nom Fournisseur</label>          
                </div>     
                    </div>
                </span>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light btn-new d-none btn-rounded" role="insert">Nouveau</button>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                    <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                </div>
            </form>
        </div>
    </div>    
</div>`)
    $('body').append($modele);
    forms();
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).update();
    });
    $modele.find('#formFournisseur').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.fournisseur = $('#fournisseur').is(':checked');
            data.sous_traitance = $('#sous_traitance').is(':checked');
            if ($modele.data('update') && role.update()) {
                data.idFournisseur = $modele.attr('id');
                data.statment = 'update';
                let param = {
                    param: [data]
                }
                let list = insertUpdateFournisseur(param)[0];
                if (list.idFournisseur) {
                    ittone.success('successfully');
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.statment = 'insert';
                let param = {
                    param: [data]
                }
                let list = insertUpdateFournisseur(param)[0];
                if (list.idFournisseur) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idFournisseur);
                    $modele.data('update', true);
                }
            }
            selectFournisseur($input);
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    $modele.find('.generateurCode').on('click', this, function () {
        let data = GenerateurCode({ statement: 'Fournisseur' });
        if (data.length) {
            let codeC = data[0].codeFournisseur;
            codeC = parseInt(codeC.substring(2, codeC.length)) + 1;
            $('#codeFournisseur').setVal("FR" + ittone.stringWithZero(codeC, 4));
        } else {
            $('#codeFournisseur').setVal("FR0001");
        }
    });
}

//Contact
export function tableCntact($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listContact(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idContact);
        }
    });
    return table;
}
export function selectContact($input, dt) {
    let list = listContact(dt);
    $input.html('')
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idContact,
            text: obj.nomComplet,
            data: obj
        }
    });
    $input.select2({ data: xdata });
}
export function templateContact(tableRander, id) {
    let $modele = $(`
    <div role="dialog" class="modal d-none">
                <div class="modal-dialog modal-lg modal-dialog-centered addEp">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">EMP</h5>
                            <!-- <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button> -->
                        </div>
                        <form class="needs-validation" id="formEMP" novalidate autocomplete="off">
                            <span class="radiosStyle">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col">
                                            <div class="mb-3 col-md-6">
                                                <label for="civilite" class="form-label">Civilité
                                                </label>
                                                <select class="form-select" name="civilite" id="civilite">
                                                    <option value="madame">madame</option>
                                                    <option value="Monsieur">Monsieur</option>
                                                </select>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="nomComplet" name="nomComplet"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Prénom est obligatoire
                                                </div>
                                                <label class="form-label" for="nomComplet">Prénom</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="nomContact" name="nomContact"
                                                    class="form-control" required />
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom est obligatoire
                                                </div>
                                                <label class="form-label" for="nomContact">Nom</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="fonctionalite" name="fonctionalite"
                                                    class="form-control" />
                                                <label class="form-label" for="fonctionalite">Fonction</label>
                                            </div>
                                            <div class="row mb-3 mt-4 align-items-center">
                                                <div class='form-group col-9 '>
                                                <div class="tagtext-type">
                                                    <label for="mobile-number-list">Numéro de téléphone</label>
                                                    <div id="mobile-number-list"></div>
                                                </div>
                                                </div>
                                                <div class="form-check col-3 ml-1">
                                                    <label class="form-check-label" for="useWtsp">
                                                    <img class="img-logo" for="teleClient"
                                                    src="./image/app/whatsapp.png" alt="" style='padding-top: 2pxpx;width: 40%;'></label>
                                                    <input class="form-check-input" type="checkbox" id="useWtsp" name='useWtsp'/>
                                                </div>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="email" name="email" class="form-control" />
                                                <label class="form-label" for="email">Email</label>
                                            </div>
                                            <div class="form-outline mb-3">
                                                <input type="text" id="note" name="note" class="form-control" />
                                                <label class="form-label" for="note">Note</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                                    role="insert">Nouveau</button>
                                <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                                <button type="submit"
                                    class="btn btn-success btn-sauvegarder btn-rounded mx-2">Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>`)
    $('body').append($modele);

    forms();
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).update();
    });
    $modele.find('#mobile-number-list').tagList('create', {
        tagValidator: function (mobileNumber) {
            // var mobileNumberPat = /^[0-9]{1}[0-9]{9}$/;
            var mobileNumberPat = ''
            return $.trim(mobileNumber)
        }
    });
    if (id) {
        $modele.data('update', true);
        let list = contactById({ id: id })[0];
        $modele.attr('data-id', id)
        ittone.convertJsonToForm($('#formEMP'), list);
        if (list.gsm.indexOf('[') != -1)
            JSON.parse(list.gsm).forEach((ele) => {
                $modele.find('#mobile-number-list').val($('#mobile-number-list textarea').val() + ele + ' ');
                $modele.find('#mobile-number-list').tagList('Add', ele);
            })
        else {
                $modele.find('#mobile-number-list').val($('#mobile-number-list textarea').val() + list.gsm + ' ');
                $modele.find('#mobile-number-list').tagList('Add', list.gsm);
        }
    }
    $modele.find('#formEMP').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.idClient = $.screenINVT.attr('id');
            data.state = 'insert'
            data.useWtsp = data.useWtsp == "on"
            $modele.find('#mobile-number-list .taglist-tags').each(function (index, val) {
                data.gsm = JSON.stringify($(val).text().split('\n').filter((element) => element !== ''))
            });
            if ($modele.data('update') && role.update()) {
                data.state = 'update'
                data.idContact = $modele.attr('data-id')
                let dt = contactAddUp({ param: [data] })[0]
                if (dt.idContact) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, dt, dt.idContact);
                }
            }
            else if (role.insert()) {
                let dt = contactAddUp({ param: [data] })[0]
                if (dt.idContact) {
                    ittone.success('successfully');
                    ittone.addInDataTable(tableRander, dt)
                }
            }
        }
    })
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
//Action
export function tableAction($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listActionClient(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idAction);
        }
    });
    return table;
}
export function templateActions(tableRander, id, idClient, $btn) {
    let $modele = $(` <div role="dialog" class="modal d-none">
    <div class="modal-dialog modal-lg modal-dialog-centered addAct">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Action</h5>
                <!-- <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button> -->
            </div>
            <form class="needs-validation" id="formAction" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-6 col-ms-10 mt-1">
                                <div>
                                    <label for="idTypeAction" class="form-label">Type Action
                                    </label>
                                    <select class="form-select" name="idTypeAction">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2 col-ms-2 mt-1">
                                <div>
                                    <span class="btn btn-secondary btn-input" id='addType'><i
                                            class="fa fa-lg fas fa-plus"></i></span>
                                </div>
                            </div>
                            <div class="col-md-4 col-ms-12 mt-1">
                                <div class="form-outline">
                                    <div class="form-check col-4 ml-1">
                                        <input class="form-check-input" type="checkbox" id="Fait" />
                                        <label class="form-check-label" for="Fait">Fait</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-6 col-ms-12 mt-1">
                                <div class="ui calendar inputDate mb-1 disabled" id="createdateAction">
                                    <label class="form-label">Date Création</label>
                                    <div class="ui input left icon w-100">
                                        <i class="calendar icon"></i>
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-ms-12 mt-1">
                                <label id="lastModificationAction">

                                </label>
                            </div>
                        </div>
                        <div class="row mb-2 mt-2 align-items-center">
                            <h6>Date Action</h6>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-6 col-ms-12 mt-1">
                                <div class="ui calendar inputDate mb-1 " id="dateStart">
                                    <label class="form-label">Date de Début
                                    </label>
                                    <div class="ui input left icon w-100">
                                        <i class="calendar icon"></i>
                                        <input type="text" required>
                                        <div class="invalid-feedback sty-feedback">
                                            Date Debut is required
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-ms-12 mt-1">
                                <div class="ui calendar inputTime mb-1 " id="heureStart">
                                    <label class="form-label"> Heure de Début
                                    </label>
                                    <div class="ui input left icon w-100">
                                        <i class="calendar icon"></i>
                                        <input type="text" name="heureDebut">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-6 col-ms-12 mt-1">
                                <div class="ui calendar inputDate mb-1 " id="dateEnd">
                                    <label class="form-label">Date de Fin
                                    </label>
                                    <div class="ui input left icon w-100">
                                        <i class="calendar icon"></i>
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-ms-12 mt-1">
                                <div class="ui calendar inputTime mb-1 " id="heureEnd">
                                    <label class="form-label"> Heure de Fin
                                    </label>
                                    <div class="ui input left icon w-100">
                                        <i class="calendar icon"></i>
                                        <input type="text" name="heureFin">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-10 col-ms-12 mt-1">
                                <div>
                                    <label for="idActionCate" class="form-label">Catégorie
                                    </label>
                                    <select class="form-select" name="idActionCate">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2 col-ms-12 mt-1">
                                <div>
                                    <span class="btn btn-secondary btn-input mt-4 addCate"><i
                                            class="fa fa-lg fas fa-plus"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-12 col-ms-12 mt-1">
                                <div class="form-outline">
                                    <input type='text' class="form-control" id="objet" name="objet">
                                    <label class="form-label" for="objet">Objet</label>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-12 col-ms-12 mt-1">
                                <div class="form-outline">
                                    <textarea class="form-control" id="descri" name="descri" rows="3"></textarea>
                                    <label class="form-label" for="descri">Decription</label>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2 mt-2 align-items-center">
                            <h6>Alarme</h6>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-6 col-ms-12 mt-1">
                                <div class="form-outline ui calendar inputDate mb-1 " id="dateAlarm">
                                    <label class="form-label">Date d'Alarme
                                    </label>
                                    <div class="ui input left icon w-100">
                                        <i class="calendar icon"></i>
                                        <input type="text">
                                        <div class="invalid-feedback sty-feedback">
                                            Date Début est obligatoire
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-ms-12 mt-1">
                                <div class="ui calendar inputTime mb-1 " id="heureAlarm">
                                    <label class="form-label"> Heure d'Alarme
                                    </label>
                                    <div class="ui input left icon w-100">
                                        <i class="calendar icon"></i>
                                        <input type="text" name="heureAlarm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2 mt-2 align-items-center">
                            <h6>Contact</h6>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-6 col-ms-12 mt-1">
                                <label for="civilite" class="form-label">Société
                                </label>
                                <select class="form-select" name="idClient"">
                                </select>
                            </div>
                            <div class="col-md-6 col-ms-12 mt-1">
                                <label for="civilite" class="form-label">Employé
                                </label>
                                <select class="form-select" name="idContact" id="idEmp">
                                </select>
                            </div>
                        </div>
                    </div>
                </span>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                        role="insert">Nouveau</button>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                    <button type="submit"
                        class="btn btn-success btn-sauvegarder btn-rounded mx-2">Ajouter</button>
                </div>
            </form>
        </div>
    </div>
                    </div>`)
    $('body').append($modele);
    selectClient($modele.find('select[name=idClient]'))

    selectContact($modele.find('#idEmp'), {
        param: [{
            idClient: idClient || 0
        }]
    });
    $modele.find('select[name=idClient]').val($modele.attr('id')).trigger('change');
    selectTypeAction($modele.find('select[name=idTypeAction]'))
    selectCateAct($modele.find('select[name=idActionCate]'))
    forms();
    if ($modele.find('.ui.calendar.inputDate').length) {
        $modele.find('.ui.calendar.inputDate').inputDate();
    }
    if ($modele.find('.ui.calendar.inputTime').length) {
        $modele.find('.ui.calendar.inputTime').inputTime();
    }
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).update();
    });
    if (idClient) {
        $modele.find('select[name=idClient]').val(idClient).trigger('change')
    }
    if (id) {
        let list = ActionById({ id: id })[0];
        $modele.attr('data-id', id)
        $modele.data('update', true);
        $modele.find("#Fait").setChecked(list.fait)
        $modele.find('#dateStart').setDate(list.dateDebut)
        $modele.find('#dateEnd').setDate(list.dateFin)
        $modele.find('#dateAlarm').setDate(list.dateAlarm)
        $modele.find('#createdateAction').setDate(list.createdate)
        ittone.convertJsonToForm($('#formAction'), list);
        $modele.find('#idEmp').val(list.idContact)
    }
    $modele.find('#formAction').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.state = 'insert'
            data.fait = $modele.find("#Fait").is(':checked')
            data.dateDebut = $modele.find('#dateStart').getDate()//.add(6, 'hours')
            data.dateFin = $modele.find('#dateEnd').getDate()//.add(6, 'hours')
            data.dateAlarm = $modele.find('#dateAlarm').getDate()//.add(6, 'hours')
            console.log(data)
            delete data.idClient
            if ($modele.data('update') && role.update()) {
                data.state = 'update'
                data.idAction = $modele.attr('data-id')
                let dt = ActionClientAddUp({ param: [data] })[0]
                if (dt.idAction) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, dt, dt.idAction);
                    if ($btn) $btn.click()
                }
            }
            else if (role.insert()) {
                let dt = ActionClientAddUp({ param: [data] })[0]
                if (dt.idAction) {
                    ittone.success('Successfully')
                    if (tableRander)
                        ittone.addInDataTable(tableRander, dt)
                    if ($btn) $btn.click()
                }
            }
        }
    })
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    $modele.find('#addType').on('click', this, function () {
        templateActionType(null, null, $modele.find('select[name=idTypeAction]'), $btn)
    });
    $modele.find('.addCate').on('click', this, function () {
        templateCateAction(null, null, $modele.find('select[name=idActionCate]'))
    });
    $modele.find('select[name=idClient]').on('change', this, function () {
        selectContact($modele.find('select[name=idContact]'), {
            param: [{
                idClient: +$(this).val()
            }]
        })
    })
    ittone.show($modele);
}
//Offres
export function tableOffre($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listOfferClient(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idEntet);
        }
    });
    return table;
}
export function templateOffers(tableRander, id) {
    let $modele = $(`<div role="dialog" class="modal d-none">
    <div class="modal-dialog modal-lg modal-dialog-centered addOff">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Offres</h5>
                <!-- <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button> -->
            </div>
            <form class="needs-validation" id="formOffre" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-12">
                                <div class="ui calendar inputDate mb-1" id="emisLe">
                                    <label class="form-label">Emis Le</label>
                                    <div class="ui input left icon ml-2">
                                        <i class="calendar icon"></i>
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-12">
                                <div class="form-outline">
                                    <input type="text" name="refer" class="form-control" />
                                    <label class="form-label" for="refer">Référence
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-12">
                                <div class="form-outline">
                                    <input type="text" name="designation" class="form-control" />
                                    <label class="form-label" for="designation">Désignation
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-12">
                                <div class="form-outline">
                                    <input type="number" name="prixSurSite" class="form-control" />
                                    <label class="form-label" for="prixSurSite">Prix Sur Site
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-12">
                                <div class="ui calendar inputDate mb-1" id="dateValide">
                                    <label class="form-label">Validé</label>
                                    <div class="ui input left icon ml-2">
                                        <i class="calendar icon"></i>
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                        role="insert">Nouveau</button>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                    <button type="submit"
                        class="btn btn-success btn-sauvegarder btn-rounded mx-2">Ajouter</button>
                </div>
            </form>
        </div>
    </div>
                    </div>`)
    $('body').append($modele);
    forms();
    if ($modele.find('.ui.calendar.inputDate').length) {
        $modele.find('.ui.calendar.inputDate').inputDate();
    }
    if ($modele.find('.ui.calendar.inputTime').length) {
        $modele.find('.ui.calendar.inputTime').inputTime();
    }
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).update();
    });
    if (id) {
        $modele.data('update', true);
        let list = offerById({ id: id })[0];
        $modele.attr('data-id', id)
        $modele.find('#emisLe').setDate(list.emisLe)
        $modele.find('#dateValide').setDate(list.dateValide)
        $('#tableOffre').attr('data-state', "update")
        ittone.convertJsonToForm($('#formOffre'), list);
    }
    $modele.find('#formOffre').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.state = 'insert'
            data.emisLe = $modele.find('#emisLe').getDate()
            data.dateValide = $modele.find('#dateValide').getDate()
            data.idClient = $.screenINVT.attr('id');
            if ($modele.data('update') && role.update()) {
                data.state = 'update'
                data.idOffre = $modele.attr('data-id')
                let dt = offerAddUp({ param: [data] })[0]
                if (dt.idOffre) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, dt, dt.idOffre);
                }
            }
            else if (role.insert()) {
                let dt = offerAddUp({ param: [data] })[0]
                if (dt.idOffre) {
                    ittone.success('Successfully')
                    ittone.addInDataTable(tableRander, dt)
                }
            }
        }
    })
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}

export function tableTypeAction($input, columns_title) {
    let list = ittone.AjaxJson(url + '/Calendar/Default.aspx/listcalendar', '');
    let table = $input.randerTable(columns_title, list, {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idTypeAction);
        }
    });
    return table;
}
export function selectTypeAction($input) {
    let list = ittone.AjaxJson(url + '/Calendar/Default.aspx/listcalendar', '');

    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idTypeAction,
            text: obj.nomType,
            data: obj
        }
    });
    $input.select2({ data: xdata });
}
export function templateActionType(tableRander, id, $input, $btn) {
    let $modele = $(`
    <div role="dialog" class="modal d-none">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Type Action</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
            <form class="needs-validation" id="frmActioType" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">                           
                        <div class="row">
                                <div class="col-12">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="nomType" name="nomType" class="form-control" required/>
                                        <div class="invalid-feedback sty-feedback">
                                            Nom Type est obligatoire
                                        </div>
                                        <label class="form-label" for="nomType">Nom Type</label>          
                                    </div> 
                                    <div class="mb-3 mt-4">
                                        <label class="form-label" for="nomRelation">Couleur</label>          
                                        <input type="color" name="codeColor" class="form-control form-control-color" required/>
                                        <div class="invalid-feedback sty-feedback">
                                            Couleur est obligatoire
                                        </div>
                                    </div> 
                                </div>
                        </div> 
                    </div>
                </span>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light btn-new d-none btn-rounded" role="insert">Nouveau</button>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                    <button type="submit" class="btn btn-success btn-sauvegarder btn-rounded mx-2">Sauvegarder</button>
                </div>
            </form>
        </div>
    </div>    
</div>`)
    $('body').append($modele);

    forms();
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).update();
    });
    if (id) {
        $modele.data('update', true);
        
        let list = ittone.AjaxJson(url + '/Calendar/Default.aspx/listcalendarbyid', JSON.stringify({ id: id }))[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($modele.find('#frmActioType'), list);
    }
    $modele.find('#frmActioType').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.idDossier = ittone.idDossier()
            if ($modele.data('update') && role.update()) {
                data.idTypeAction = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = ittone.AjaxJson(url + '/Calendar/Default.aspx/insertTypeAction', JSON.stringify(param))[0];
                if (list.idTypeAction) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idTypeAction);
                    if ($input.length) selectTypeAction($input)
                    if ($btn) $btn.click()
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let list = ittone.AjaxJson(url + '/Calendar/Default.aspx/insertTypeAction', JSON.stringify(param))[0];
                if (list.idTypeAction) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idTypeAction);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)
                    if ($input) selectTypeAction($input)
                    if ($btn) $btn.click()
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
//Parc
export function tableParc($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listParcClient(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idParc);
        }
    });
    return table;
}
export function templateParc(tableRander, id) {
    let $modele = $(`<div role="dialog" class="modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Parc</h5>
                <!-- <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button> -->
            </div>
            <form class="needs-validation" id="formParc" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">
                        <div class="row m-0 mb-1 mt-1 align-items-center">
                            <div class="col-md-12 col-ms-12 mt-1">
                                <div class="ui calendar inputDate mb-1" id="dateParc">
                                    <label class="form-label">Date</label>
                                    <div class="ui input left icon w-100">
                                        <i class="calendar icon"></i>
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-12 col-ms-12 mt-1">
                                <label for="idPaysClient" class="form-label">équipements
                                    actuels</label>
                                <select class="form-select article" name="reference">
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-ms-12 mt-1">
                                <div class="form-outline mb-3">
                                    <input type="text" name="designation" row='30'
                                        class="form-control">
                                    <label class="form-label" for="designation">Nom</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-ms-12 mt-1">
                                <div class="form-outline mb-3">
                                    <input type="number" id="prix" name="prix" class="form-control" required />
                                    <label class="form-label" for="prix">Prix</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-ms-12 mt-1">
                                <div class="form-outline mb-3">
                                    <input type="text" id="etat" name="etat" class="form-control" />
                                    <label class="form-label" for="etat">Etat</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </span>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light btn-new d-none btn-rounded"
                        role="insert">Nouveau</button>
                    <button type="button" class="btn btn-light btn-annuler btn-rounded">Annuler</button>
                    <button type="submit"
                        class="btn btn-success btn-sauvegarder btn-rounded mx-2">Ajouter</button>
                </div>
            </form>
        </div>
    </div>
</div>`)
    $('body').append($modele);
    forms();
    selectArticle($modele.find('.article'));
    $modele.find('.article').on('change', this, function () {
        let dt = $(this).select2('data')[0].data
        console.log(dt)
        if (dt) {
            $modele.find('input[name=designation]').val(dt.nomArticle)
            $modele.find('input[name=prix]').val(dt.prixVente_TTC)
            $modele.find('input[name=etat]').val(dt.etatMater)
            $modele.find('input').focus()
        }
    })
    if ($modele.find('.ui.calendar.inputDate').length) {
        $modele.find('.ui.calendar.inputDate').inputDate();
    }
    if ($modele.find('.ui.calendar.inputTime').length) {
        $modele.find('.ui.calendar.inputTime').inputTime();
    }
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).update();
    });
    if (id) {
        $modele.data('update', true);
        let list = parcById({ id: id })[0];
        $modele.attr('data-id', id)
        $modele.find('#dateParc').setDate(list.dateParc)
        $('#tableOffre').attr('data-state', "update")
        ittone.convertJsonToForm($('#formParc'), list);
    }
    $modele.find('#formParc').on('submit', this, function () {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.state = 'insert'
            data.dateParc = $modele.find('#dateParc').getDate()
            data.idClient = $.screenINVT.attr('id');
            if ($modele.data('update') && role.update()) {
                data.state = 'update'
                data.idParc = $modele.attr('data-id')
                let dt = parcAddUp({ param: [data] })[0]
                if (dt.idParc) {
                    ittone.success('successfully');
                    ittone.updateInDataTable(tableRander, dt, dt.idParc);
                }
            }
            else if (role.insert()) {
                let dt = parcAddUp({ param: [data] })[0]
                if (dt.idParc) {
                    ittone.success('Successfully')
                    ittone.addInDataTable(tableRander, dt)
                }
            }
        }
    })
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}