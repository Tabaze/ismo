import { listPropByidClient } from './service.js';

export function selectPropriete($input, id) {
    $input.html('');
    let list = listPropByidClient({ id: id });
    let xdata = [];
    for (let i = 0; i < list.length; i++) {
        let obj = list[i];
        let parsedProp = JSON.parse(obj.propriete);

        for (let j = 0; j < parsedProp.length; j++) {
            let prop = parsedProp[j];
            let textProp = prop.Propriete + ' ( ' + prop.Valeur + ' )';

            xdata.push({
                id: obj.idClient,
                text: textProp,
                propriete: prop.Propriete,
                valeur: prop.Valeur
            });
        }
    }
    xdata.unshift({ id: '', text: '' });
    $input.select2({ data: xdata, placeholder: 'Propriété ( Valeur )' });
}


