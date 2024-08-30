export function divProgress(){
   let div=`<div class="divProgress">
    <div style="margin-top: 4px;">import : <span id="spanImport">0</span></div>
    <div>Error : <span id="spanError">0</span></div>
    <div class="progr">
        <span id="percent">0</span>%
    </div>
</div>`;
 $('.divProgress').remove();
 $('body').append(div);
} 