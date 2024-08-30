import {dossierList,getFoldersNameEntet} from './service.js';
export function templateDossier(data){
    let logo = data.Logo || ittone.defaultImgFolder;
    return `<div class="col m-2 folder">
    <span class="text-end flex-row-reverse m-1 fs-5 float-end update">
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </span>
    <div class="mt-4 align-items-center">
        <img src="`+logo+`" class="img-folder"/>
    </div> 
    <div class="mt-3">`+data.Nom_dossier+`/`+ittone.getYear(data.dateExeStart)+`</div>
   </div>`;   
}
export function templateAddDossier(){
    return `<div class="col m-2 d-flex justify-content-center align-items-center folder add-folder">
        <div>
            <svg class="img-folder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/>
            </svg>
        </div> 
    </div>`
}
export function checkBoxUsers(data){
    return `<div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" value="" data-id="`+data.idUser+`" id="checkBox_`+data.idUser+`" />
        <label class="form-check-label" for="checkBox_`+data.idUser+`">`+data.nomUser+`</label>
    </div>`
}
export function selectAllDossier($input) {
    let list = dossierList();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj.idDossier,
            text: obj.Nom_dossier+`/`+ittone.getYear(obj.dateExeStart),
            datax:obj
        }
    });
    $input.select2({ data: xdata });
}
export function selectFoldersNameEntet($input) {
    $input.html('')
    let list = getFoldersNameEntet();
    let xdata = $.map(list, function(obj) {
        return {
            id: obj,
            text: obj
        }
    });
    $input.select2({ data: xdata });
}