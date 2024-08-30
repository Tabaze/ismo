// /************************* function Template ********************************* */
// var template = parseHTMLTemplate(function() {
//     /*
//     <li class="transfer-double-selected-list-li  transfer-double-selected-list-li-{{= id }} .clearfix">
//         <div class="checkbox-group">
//             <input {{= disabled ? disabled="disabled" : " " }} type="checkbox" value="{{= value }}" class="checkbox-normal checkbox-selected-item-{{= id }}" id="selectedCheckbox_{{= index }}_{{= id }}">
//             <label class="checkbox-selected-name-{{= id }}" for="selectedCheckbox_{{= index }}_{{= id }}">{{= labelText }}</label>
//         </div>
//     </li>
//     */
// })

// var compiled = $.template(template);
// console.log(compiled({ id: 251, index: 15, value: 'dsfgdsfg', labelText: 'sdfsdfsdf', disabled: true })) 
// function parseHTMLTemplate(func) {
//     return func.toString().match(/\/\*([\s\S]*?)\*\//)[1]
// }

$(document).ready(function () {
    ittone.AjaxJsonAsync('test.aspx/bigData', '', function () {
        console.log('befor')
    }, function (d) {
        console.log(d)
    })
});