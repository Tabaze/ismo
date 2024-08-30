import { listVille, listPays, listDepot, listTresor, listModRglm, listTaxe, listDepotSup, SubDepotbyIdDepot, listService, listUniteMesure, listPropriete, listOriContact, InsertUpdateOriContact, OriContactById, listIndustrie, IndustrieById, InsertUpdateIndustrie, CategorieById, InsertUpdateCategorie, listCategorie, listType, TypeById, InsertUpdateType, PotClientById, InsertUpdatePotClient, listPotClient, listRelation, RelationById, InsertUpdateRelation, listCateAction, InsertUpdateCateAction, listRebrique, InsertUpdateRebrique, rebriqueById, listWoo, wooById, InsertUpdateWoo } from './service.js';
export function selectVille($input, dt) {
    $input.html('')
    let list = listVille(dt);
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idVille,
            text: obj.name
        }
    });
    $input.select2({
        data: xdata,
        width: '100%'
    });
}
export function selectPays($input) {
    let list = listPays();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.id,
            text: obj.name
        }
    });
    $input.select2({
        data: xdata,
        width: '100%'
    });
}
export function selectTaxeAchat($input) {
    let list = listTaxe();
    let xdata = $.map(list, function (obj) {
        if (obj.typeTaxe == 'collectee')
            return {
                id: obj.idTaxe,
                text: obj.nomTaxe,
                data: obj
            }
    });
    xdata.unshift({ id: '', text: '' });
    $input.select2({ data: xdata });
}
export function selectTaxeVente($input) {
    let list = listTaxe();
    let xdata = $.map(list, function (obj) {
        if (obj.typeTaxe == 'deductible')
            return {
                id: obj.idTaxe,
                text: obj.nomTaxe,
                data: obj
            }
    });
    xdata.unshift({ id: '', text: '' });
    $input.select2({ data: xdata });
}
export function selectDepot($input) {
    $input.html('')
    let list = listDepot();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idDepot,
            text: obj.nomDepot
        }
    });
    $input.select2({ data: xdata, placeholder: 'Dépôt' });
}
export function selectModRglm($input) {
    $input.html('')
    let list = listModRglm();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idModRglm,
            text: obj.nomModRglm,
            data: obj
        }
    });
    $input.select2({ data: xdata, placeholder: 'Mode de réglement' });
}
export function selectServices($input) {
    $input.html('')
    let list = listService();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idService,
            text: obj.nomService
        }
    });
    $input.select2({ data: xdata, placeholder: 'Service' });
}
export function tableDepot($input, columns_title) {
    let table = $input.randerTable(columns_title, listDepot(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idDepot);
        }
    });
    return table;
}
export function tableDepotSup($input, columns_title) {
    let table = $input.randerTable(columns_title, listDepotSup(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idSupDepot);
        }
    });
    return table;
}
export function tableTresor($input, columns_title) {
    let table = $input.randerTable(columns_title, listTresor(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idTreso);
        }
    });
    return table;
}
export function tableVille($input, columns_title, dt) {
    let table = $input.randerTable(columns_title, listVille(dt), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idVille);
        }
    });
    return table;
}
export function tablePays($input, columns_title) {
    let table = $input.randerTable(columns_title, listPays(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.id);
        }
    });
    return table;
}
export function tableModRglm($input, columns_title) {
    let table = $input.randerTable(columns_title, listModRglm(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idModRglm);
        }
    });
    return table;
}
export function tableTaxe($input, columns_title) {
    let table = $input.randerTable(columns_title, listTaxe(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idTaxe);
        }
    });
    return table;
}
export function tableService($input, columns_title) {
    let table = $input.randerTable(columns_title, listService(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idService);
        }
    });
    return table;
}
export function selectSubDepotbyId($input, id) {
    $input.html('')
    let list = SubDepotbyIdDepot({ id: id });
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idSupDepot,
            text: obj.nomSupDepot
        }
    });
    xdata.unshift({ id: '', text: '' });
    $input.select2({ data: xdata, placeholder: "Emplacement", });
}
export function selectSubDepot($input) {
    $input.html('')
    let list = listDepotSup();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idSupDepot,
            text: obj.nomSupDepot + ' ( ' + obj.nomDepot + ' ) '
        }
    });
    xdata.unshift({ id: '', text: '' });
    $input.select2({ data: xdata, placeholder: "Emplacement", });
}
export function selectTresor($input) {
    $input.html('')
    let list = listTresor();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idTreso,
            text: obj.nameTreso
        }
    });
    $input.select2({ data: xdata, placeholder: "Trésororie" });
}
export function tableUniteMesure($input, columns_title) {
    let table = $input.randerTable(columns_title, listUniteMesure(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idService);
        }
    });
    return table;
}
export function selectUniteMesure($input) {
    $input.html('')
    let list = listUniteMesure();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idUnite,
            text: obj.descUnite
        }
    });
    $input.select2({ data: xdata });
}
export function tablePropriete($input, columns_title) {
    let table = $input.randerTable(columns_title, listPropriete(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idPropriete);
        }
    });
    return table;
}
export function selectPropriete($input) {
    $input.html('')
    let list = listPropriete();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idPropriete,
            text: obj.nomPropriete
        }
    });
    $input.select2({ data: xdata });
}

/*********** OriContact **************/
export function tableOriContact($input, columns_title) {
    let table = $input.randerTable(columns_title, listOriContact(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idOrigine);
        }
    });
    return table;
}
export function selectOriContact($input) {
    $input.html('')
    let list = listOriContact();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idOrigine,
            text: obj.nomOrigine,
            data: obj
        }
    });
    $input.select2({ data: xdata });
}
export function templateOrigine(tableRander, id, $input) {
    let $modele = $(`<div role="dialog" class="modal d-none">
    <div class="modal-dialog modal-lg modal-dialog-centered OriContact">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Origine du contrat</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
            <form class="needs-validation" id="formOrigine" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">                           
                        <div class="row">
                                <div class="col-12">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="nomOrigine" name="nomOrigine" class="form-control" required/>
                                        <div class="invalid-feedback sty-feedback">
                                            Nom Contrat est obligatoire
                                        </div>
                                        <label class="form-label" for="nomOrigine">Nom Contrat</label>          
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
        let list = OriContactById({ id: id })[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($('#formOrigine'), list);
        settingForma(true);
    }
    $modele.find('#formOrigine').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($modele.data('update') && role.update()) {
                data.idOrigine = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateOriContact(param)[0];
                if (list.idOrigine) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idOrigine);
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateOriContact(param)[0];
                if (list.idOrigine) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idOrigine);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)
                    else {
                        selectOriContact($input)
                        $input.val(list.idOrigine).trigger('change')
                    }
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
/*********** Industrie **************/
export function tableIndustrie($input, columns_title) {
    let table = $input.randerTable(columns_title, listIndustrie(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idIndustrie);
        }
    });
    return table;
}
export function selectIndustrie($input) {
    $input.html('')
    let list = listIndustrie();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idIndustrie,
            text: obj.nomIndustrie,
            data: obj
        }
    });
    $input.select2({ data: xdata });
}
export function templateIndustrie(tableRander, id, $input) {
    let $modele = $(`<div role="dialog" class="modal d-none">
    <div class="modal-dialog modal-lg modal-dialog-centered Industrie">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Industrie</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
            <form class="needs-validation" id="formIndustrie" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">                           
                        <div class="row">
                                <div class="col-12">
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="nomIndustrie" name="nomIndustrie" class="form-control" required/>
                                        <div class="invalid-feedback sty-feedback">
                                            Nom Industrie est obligatoire
                                        </div>
                                        <label class="form-label" for="nomIndustrie">Nom Industrie</label>          
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
        let list = IndustrieById({ id: id })[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($('#formIndustrie'), list);
        settingForma(true);
    }
    $modele.find('#formIndustrie').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($modele.data('update') && role.update()) {
                data.idIndustrie = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateIndustrie(param)[0];
                if (list.idIndustrie) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idIndustrie);
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateIndustrie(param)[0];
                if (list.idIndustrie) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idIndustrie);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)
                    else {
                        selectIndustrie($input)
                        $input.val(list.idIndustrie).trigger('change')
                    }
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
/*********** Categorie **************/
export function tableCategorie($input, columns_title) {
    let table = $input.randerTable(columns_title, listCategorie(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idCategorie);
        }
    });
    return table;
}
export function selectCategorie($input) {
    $input.html('')
    let list = listCategorie();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idCategorie,
            text: obj.nomCategorie,
            data: obj
        }
    });
    xdata.unshift({ id: 0, text: 'Categorie' });//, disabled: true
    $input.select2({ data: xdata });
}
export function templateCategorie(tableRander, id, $input) {
    let $modele = $(`<div role="dialog" class="modal d-none">
    <div class="modal-dialog modal-lg modal-dialog-centered Categorie">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Categorie</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
            <form class="needs-validation" id="formCategorie" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">                           
                        <div class="row">
                                <div class="col-12">
                                   <!-- <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="codeCategorie" name="codeCategorie" class="form-control" required/>
                                        <div class="invalid-feedback sty-feedback">
                                            Code Catégorie est obligatoire
                                        </div>
                                        <label class="form-label" for="nomCategorie">Code Catégorie</label>          
                                    </div> -->
                                    <div class="form-outline mb-3 mt-4">
                                        <input type="text" id="nomCategorie" name="nomCategorie" class="form-control" required/>
                                        <div class="invalid-feedback sty-feedback">
                                            Nom Catégorie est obligatoire
                                        </div>
                                        <label class="form-label" for="nomCategorie">Nom Catégorie</label>          
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
        let list = CategorieById({ id: id })[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($('#formCategorie'), list);
        settingForma(true);
    }
    $modele.find('#formCategorie').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($modele.data('update') && role.update()) {
                data.idCategorie = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateCategorie(param)[0];
                if (list.idCategorie) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idCategorie);
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateCategorie(param)[0];
                if (list.idCategorie) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idCategorie);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)
                    else {
                        selectCategorie($input)
                        $input.val(list.idCategorie).trigger('change')
                    }
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
/*********** Type **************/
export function tableType($input, columns_title) {
    let table = $input.randerTable(columns_title, listType(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idType);
        }
    });
    return table;
}
export function selectType($input) {
    $input.html('')
    let list = listType();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idType,
            text: obj.nomType,
            data: obj
        }
    });
    $input.select2({ data: xdata });
}
export function templateType(tableRander, id) {
    let $modele = $(`
    <div role="dialog" class="modal d-none">
        <div class="modal-dialog modal-lg modal-dialog-centered Type">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Type</h5>
                    <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                </div>
                <form class="needs-validation" id="formType" novalidate autocomplete="off">
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
        let list = TypeById({ id: id })[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($('#formType'), list);
        settingForma(true);
    }
    $modele.find('#formType').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($modele.data('update') && role.update()) {
                data.idType = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateType(param)[0];
                if (list.idType) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idType);
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateType(param)[0];
                if (list.idType) {
                    ittone.success('successfully');
                    $.modalPropriete.attr('id', list.idType);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
/*********** PotClient **************/
export function tablePotClient($input, columns_title) {
    let table = $input.randerTable(columns_title, listPotClient(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idPotClient);
        }
    });
    return table;
}
export function selectPotClient($input) {
    $input.html('')
    let list = listPotClient();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idPotClient,
            text: obj.nomPotClient,
            data: obj,
            code: obj.codeColor
        }
    });
    $input.select2({
        data: xdata,
        templateSelection: function (data, container) {
            $(container).css("background-color", data.code);
            $(container).css("color", "black");
            return data.text;
        },
        templateResult: function (data, container) {
            $(container).css("background-color", data.code);
            $(container).css("color", "black");
            return data.text;
        }
    });
}
export function templatePotClient(tableRander, id, $input) {
    let $modele = $(`
    <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered PotClient">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Potentiel du Société</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formPotClient" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomPotClient" name="nomPotClient" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Potentiel est obligatoire
                                                </div>
                                                <label class="form-label" for="nomPotClient">Nom Potentiel</label>          
                                            </div> 
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
        let list = PotClientById({ id: id })[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($('#formPotClient'), list);
        settingForma(true);
    }
    $modele.find('#formPotClient').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($modele.data('update') && role.update()) {
                data.idPotClient = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdatePotClient(param)[0];
                if (list.idPotClient) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idPotClient);
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let list = InsertUpdatePotClient(param)[0];
                if (list.idPotClient) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idPotClient);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)

                    else {
                        selectPotClient($input)
                        $input.val(list.idPotClient).trigger('change')
                    }
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
/*********** Relation Client **************/
export function tableRelation($input, columns_title) {
    let table = $input.randerTable(columns_title, listRelation(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idRelation);
        }
    });
    return table;
}
export function selectRelation($input) {
    $input.html('')
    let list = listRelation();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idRelation,
            text: obj.nomRelation,
            code: obj.codeColor,
            data: obj
        }
    });
    $input.select2({
        data: xdata
    });
}
export function templateRelation(tableRander, id, $input) {
    let $modele = $(`
    <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered Relation">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Relation Client</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formRelation" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomRelation" name="nomRelation" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Relation est obligatoire
                                                </div>
                                                <label class="form-label" for="nomRelation">Nom Relation</label>          
                                            </div> 
                                            <!--<div class="mb-3 mt-4">
                                                <label class="form-label" for="nomRelation">Couleur</label>          
                                                <input type="color" name="codeColor" class="form-control form-control-color" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Couleur est obligatoire
                                                </div>
                                            </div> -->
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
        let list = RelationById({ id: id })[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($('#formRelation'), list);
        settingForma(true);
    }
    $modele.find('#formRelation').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            if ($modele.data('update') && role.update()) {
                data.idRelation = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateRelation(param)[0];
                if (list.idPotClient) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idRelation);
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateRelation(param)[0];
                if (list.idRelation) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idRelation);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)
                    else {
                        selectRelation($input)
                        $input.val(list.idRelation).trigger('change')
                    }
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
/*********** Relation Client **************/
export function tableCateActio($input, columns_title) {
    let table = $input.randerTable(columns_title, listCateAction(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idActionCate);
        }
    });
    return table;
}
export function selectCateAct($input) {
    $input.html('')
    let list = listCateAction();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idActionCat,
            text: obj.nomCate,
            data: obj
        }
    });
    $input.select2({
        data: xdata
    });
    // templateSelection: function (data, container) {
    //     // Set background color of selected option
    //     $(container).css("background-color", data.code);
    //     $(container).css("color", "black");
    //     return data.text;
    // },
    // templateResult: function (data, container) {
    //     // Set background color of each option in dropdown
    //     $(container).css("background-color", data.code);
    //     $(container).css("color", "black");
    //     return data.text;
    // }
}
export function templateCateAction(tableRander, id, $input) {
    let $modele = $(`
    <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Catégorie Action</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formCateAction" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomCate" name="nomCate" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Catégorie est obligatoire
                                                </div>
                                                <label class="form-label" for="nomCate">Nom Catégorie</label>          
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
        let list = RelationById({ id: id })[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($('#formCateAction'), list);
        settingForma(true);
    }
    $modele.find('#formCateAction').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            data.idDossier = ittone.idDossier()
            if ($modele.data('update') && role.update()) {
                data.idActionCate = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateCateAction(param)[0];
                if (list.idActionCat) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idActionCat);
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateCateAction(param)[0];
                if (list.idActionCat) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idActionCat);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)
                    else selectCateAct($input)
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
/*********** Rebrique **************/
export function tableRebrique($input, columns_title) {
    let table = $input.randerTable(columns_title, listRebrique(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idRebrique);
        }
    });
    return table;
}
export function selectRebrique($input) {
    $input.html('')
    let list = listRebrique();
    let xdata = $.map(list, function (obj) {
        return {
            id: obj.idRebrique,
            text: obj.nomRebrique,
            data: obj
        }
    });
    xdata.unshift({ id: 0, text: 'Rubrique' });//, disabled: true
    $input.select2({
        data: xdata
    });
}
export function templateRebrique(tableRander, id, $input) {
    let $modele = $(`
    <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Rubrique</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formRebrique" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomRebrique" name="nomRebrique" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Rubrique est obligatoire
                                                </div>
                                                <label class="form-label" for="nomRebrique">Nom Rubrique</label>          
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
        let list = rebriqueById({ id: id })[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($('#formRebrique'), list);
        settingForma(true);
    }
    $modele.find('#formRebrique').on('submit', this, function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            // data.idDossier = ittone.idDossier()
            if ($modele.data('update') && role.update()) {
                data.idRebrique = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateRebrique(param)[0];
                if (list.idRebrique) {
                    ittone.success('successfully');
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idRebrique);
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateRebrique(param)[0];
                if (list.idRebrique) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idRebrique);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)
                    else {
                        selectRebrique($input)
                        $input.val(list.idRebrique).trigger('change')
                    }
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        $modele.remove();
    });
    ittone.show($modele);
}
/*********** Woo **************/
export function tableWoo($input, columns_title) {
    let table = $input.randerTable(columns_title, listWoo(), {
        createdRow: function (row, data, index) {
            $(row).data('info', data);
            $(row).attr('data-id', data.idWoo);
        }
    });
    return table;
}
export function selectWoo($input) {
    $input.html('')
    let list = listWoo();
    list.forEach(obj => {
        if (obj.idParent === 0) {
          const optgroupElement = document.createElement("optgroup");
          optgroupElement.label = obj.nomCate;
          const childOptions = list.filter(childObj => childObj.idParent === obj.idWoo);
          childOptions.forEach(childObj => {
            const optionElement = document.createElement("option");
            optionElement.value = childObj.idWoo;
            optionElement.text = childObj.nomCate;
            optgroupElement.append(optionElement);
          });
      
          $input.append(optgroupElement);
        }
      });
      $input.select2();
    // let xdata = $.map(list, function (obj) {
    //     return {
    //         id: obj.idWoo,
    //         text: obj.nomCate,
    //         data: obj,
    //         optgroup: obj.idParent === 0
    //     }
    // });
    // xdata.unshift({ id: 0, text: 'Categorie Woo', disabled: true });//
    // $input.select2({
    //     data: xdata,
    // });
}
export async function getWooCate(tableRander) {
    let lt
    await ittone.getWooDataAsync('categorie').then(function (res) {
        console.log(res);
        lt = res
    })
        .catch(function (error) {
        });
    for (let i of lt) {
        let woo = wooById({ id: i.id })[0];
        let param
        if (woo) {
            param = {
                param: [{
                    idWoo: i.id,
                    nomCate: i.name,
                    state: 'update',
                    idParent: i.parent
                }]
            }
            let list = InsertUpdateWoo(param)[0];
            if (list.idWoo) {
                if (tableRander)
                    ittone.updateInDataTable(tableRander, list, list.idWoo);
            }
        }
        else {
            param = {
                param: [{
                    idWoo: i.id,
                    nomCate: i.name,
                    state: 'insert',
                    idParent: i.parent
                }]
            }
            let list = InsertUpdateWoo(param)[0];
            if (list.idWoo) {
                if (tableRander)
                    ittone.addInDataTable(tableRander, list)
            }
        }
    }
}
export function templateWoo(tableRander, id, $input) {
    let $modele = $(`
    <div role="dialog" class="modal d-none">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Rubrique</h5>
                        <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <form class="needs-validation" id="formWoo" novalidate autocomplete="off">
                        <span class="radiosStyle">
                            <div class="modal-body">                           
                            <!--<div class="row">
                                    <div class="col-12">
                                        <div class="form-outline mb-3 mt-4">
                                            <input type="text" id="idWoo" name="idWoo" class="form-control" required/>
                                            <div class="invalid-feedback sty-feedback">
                                                Nom Categorie est obligatoire
                                            </div>
                                            <label class="form-label" for="id">Identity Categorie</label>          
                                        </div> 
                                    </div>
                            </div>    -->                     
                                <div class="row">
                                        <div class="col-12">
                                            <div class="form-outline mb-3 mt-4">
                                                <input type="text" id="nomCate" name="nomCate" class="form-control" required/>
                                                <div class="invalid-feedback sty-feedback">
                                                    Nom Categorie est obligatoire
                                                </div>
                                                <label class="form-label" for="nomRebrique">Nom Categorie</label>          
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
        let list = wooById({ id: id })[0];
        $modele.attr('id', id);
        ittone.convertJsonToForm($('#formWoo'), list);
        settingForma(true);
        $modele.find('#idWoo').addClass('disabled')
    }
    $modele.find('#formWoo').on('submit', this, async function (event) {
        if (this.checkValidity()) {
            let data = ittone.convertFormToJSON($(this));
            // data.idDossier = ittone.idDossier()
            if ($modele.data('update') && role.update()) {
                data.idWoo = $modele.attr('id');
                data.state = 'update';
                let param = {
                    param: [data]
                }
                let list = InsertUpdateWoo(param)[0];
                if (list.idWoo) {
                    ittone.success('successfully');
                    ittone.postWooDataAsync(dt, 'categorie')
                    if (tableRander)
                        ittone.updateInDataTable(tableRander, list, list.idWoo);
                }

            } else if (!$modele.data('update') && role.insert()) {
                data.state = 'insert';
                let param = {
                    param: [data]
                }
                let dt = {
                    name: data.nomCate,
                }
                await ittone.postWooDataAsync(dt, 'categorie').then(function (res) {
                    data.idWoo = res.id
                })
                    .catch(function (error) {
                    });
                let list = InsertUpdateWoo(param)[0];
                if (list.idWoo) {
                    ittone.success('successfully');
                    $modele.attr('id', list.idWoo);
                    if (tableRander)
                        ittone.addInDataTable(tableRander, list)
                    else {
                        selectWoo($input)
                        $input.val(list.idWoo).trigger('change')
                        ittone.hide($modele);
                        setTimeout(() => {
                            $modele.remove();
                        }, 1000)
                    }
                }
            }
        }
    });
    $modele.find('.btn-close,.btn-annuler').on('click', this, function () {
        ittone.hide($modele);
        setTimeout(() => {
            $modele.remove();
        }, 1000)
    });
    ittone.show($modele);
}