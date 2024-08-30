import { listFamille, listArticle, listBateau, insertUpdateFamille, GenerateurCode, insertUpdateArticle, listEmailArticle, listArticleDesire } from './service.js';
import { selectTaxeVente, selectTaxeAchat } from './../ModeleBase/component.js';
export function selectParentFamille($input) {
	$input.html('');
	let list = listFamille();
	const getParentDeep = (arr, targetId) => arr.find(({ id }) => id === targetId)
		?? arr.flatMap(({ inc }) => getParentDeep(inc, targetId))
			.filter(e => e)
			.at(0);

	let result = list
		.sort(({ parentId: a }, { parentId: b }) => a - b)
		.reduce((acc, { idFamille, nomFamille, parentId }) => {
			const obj = { id: idFamille, text: nomFamille, inc: [] };
			const parentObj = getParentDeep(acc, parentId);
			if (parentObj) {
				parentObj.inc.push(obj);
			}
			else {
				acc.push(obj);
			}
			return acc;
		}, []);
	const removechildren = (obj) => {
		$.each(obj, function (key, value) {
			if (value.length == 0) {
				delete obj[key];
			} else if (Object.prototype.toString.call(value) === '[object Object]') {
				removechildren(value);
			} else if (Array.isArray(value)) {
				value.forEach(function (el) { removechildren(el); });
			}
		});
	}
	removechildren(result)
	result.unshift({ id: 0, text: '' });
	$input.select2ToTree({ treeData: { dataArr: result } });
}
export function selectFamilleGroup($input) {
	$input.html('');
	let list = listFamille();
	const getParentDeep = (arr, targetId) => arr.find(({ id }) => id === targetId)
		?? arr.flatMap(({ inc }) => getParentDeep(inc, targetId))
			.filter(e => e)
			.at(0);
	let result = list
		.sort(({ parentId: a }, { parentId: b }) => a - b)
		.reduce((acc, { idFamille, nomFamille, parentId }) => {
			const obj = { id: idFamille, text: nomFamille, inc: [] };
			const parentObj = getParentDeep(acc, parentId);
			if (parentObj) {
				parentObj.inc.push(obj);
			}
			else {
				acc.push(obj);
			}
			return acc;
		}, []);
	const removechildrenAndid = (obj) => {
		$.each(obj, function (key, value) {
			if (key == 'inc' && value.length > 0) {
				delete obj['id'];
			}
			if (value.length == 0) {
				delete obj[key];
			} else if (Object.prototype.toString.call(value) === '[object Object]') {
				removechildrenAndid(value);
			} else if (Array.isArray(value)) {
				value.forEach(function (el) { removechildrenAndid(el); });
			}
		});
	}
	removechildrenAndid(result);
	result.unshift({ id: -1, text: null });
	$input.select2ToTree({ treeData: { dataArr: result } });
}
export function tableFamille($input, columns_title) {
	let table = $input.randerTable(columns_title, listFamille(), {
		createdRow: function (row, data, index) {
			$(row).data('info', data);
			$(row).attr('data-id', data.idFamille);
		}
	});
	return table;
}
export function tableEmailArticle($input, columns_title, dt) {
	let table = $input.randerTable(columns_title, listEmailArticle(dt), {
		createdRow: function (row, data, index) {
		}
	},
		{
			columnDefs: [
				{
					searchable: false,
					orderable: false,
					targets: 0,
				},
			],
			order: [[1, 'asc']],
		});
	setTimeout(() => {
		table.draw(false)
	}, 300)
	return table;
}
export function tableArticle($input, columns_title) {
	let table = $input.randerTable(columns_title, listArticle(), {
		createdRow: function (row, data, index) {
			$(row).data('info', data);
			$(row).attr('data-id', data.idArticle);		
            console.log(data)
			if(data.isWoo!=0)$(row).addClass('isWoo')
		}
	});
	return table;
}
export function tableBateau($input, columns_title) {
	let table = $input.randerTable(columns_title, listBateau(), {
		createdRow: function (row, data, index) {
			$(row).data('info', data);
			$(row).attr('data-id', data.idBateau);
		}
	});
	return table;
}
export function selectArticle($input) {
	let list = listArticle();
	let xdata = $.map(list, function (obj) {
		return {
			id: obj.idArticle,
			text: obj.nomArticle + '( ' + obj.refArticle + ' )',
			data: obj
		}
	});
	xdata.unshift({ id: '', text: '' });
	$input.select2({ data: xdata, placeholder: 'Article' });
}
export function selectArticleDesire($input) {
	let list = listArticleDesire();
	let xdata = $.map(list, function (obj) {
		return {
			id: obj.idArticle,
			text: obj.nomArticle + '( ' + obj.refArticle + ' )',
			data: obj
		}
	});
	// xdata.unshift({ id: '', text: '' });
	$input.select2({ data: xdata });
}
export function selectArticleNon($input) {
	let list = listArticle();
	let xdata = $.map(list, function (obj) {
		return {
			id: obj.idArticle,
			text: obj.nomArticle + '( ' + obj.refArticle + ' )',
			data: obj
		}
	});
	xdata.unshift({ id: '', text: '' });
	$input.select2({ data: xdata });
}
(function ($) {
	$.fn.select2ToTree = function (options) {
		var opts = $.extend({}, options);

		if (opts.treeData) {
			buildSelect(opts.treeData, this);
		}

		opts._templateResult = opts.templateResult;
		opts.templateResult = function (data, container) {
			var label = data.text;
			if (typeof opts._templateResult === "function") {
				label = opts._templateResult(data, container);
			}
			var $iteme = $("<span class='item-label'></span>").append(label);
			if (data.element) {
				var ele = data.element;
				container.setAttribute("data-val", ele.value);
				if (ele.className) container.className += " " + ele.className;
				if (ele.getAttribute("data-pup")) {
					container.setAttribute("data-pup", ele.getAttribute("data-pup"));
				}
				if ($(container).hasClass("non-leaf")) {
					return $.merge($('<span class="expand-collapse" onmouseup="expColMouseupHandler(event);"></span>'), $iteme);
				}
			}
			return $iteme;
		};

		window.expColMouseupHandler = function (evt) {
			toggleSubOptions(evt.target || evt.srcElement);
			/* prevent Select2 from doing "select2:selecting","select2:unselecting","select2:closing" */
			evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
			evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
		}
		var s2inst = this.select2(opts);

		s2inst.on("select2:open", function (evt) {
			var s2data = s2inst.data("select2");
			s2data.$dropdown.addClass("s2-to-tree");
			s2data.$dropdown.removeClass("searching-result");
			var $allsch = s2data.$dropdown.find(".select2-search__field").add(s2data.$container.find(".select2-search__field"));
			$allsch.off("input", inputHandler);
			$allsch.on("input", inputHandler);
		});

		/* Show search result options even if they are collapsed */
		function inputHandler(evt) {
			var s2data = s2inst.data("select2");
			if ($(this).val().trim().length > 0) {
				s2data.$dropdown.addClass("searching-result");
			}
			else {
				s2data.$dropdown.removeClass("searching-result");
			}
		}
		return s2inst;
	};

	function buildSelect(treeData, $el) { // build Select options according to Select-to-Tree specification
		function buildOptions(dataArr, curLevel, pup) {
			for (var i = 0; i < dataArr.length; i++) {
				var data = dataArr[i] || {};
				var $opt = $("<option></option>");
				$opt.text(data[treeData.labelFld || "text"]);
				$opt.val(data[treeData.valFld || "id"]);
				if (data[treeData.selFld || "selected"] && String(data[treeData.selFld || "selected"]) === "true") {
					$opt.prop("selected", data[treeData.selFld || "selected"]);
				}
				if ($opt.val() === "") {
					$opt.prop("disabled", true);
					$opt.val(getUniqueValue());
				}
				$opt.addClass("l" + curLevel);
				if (pup) $opt.attr("data-pup", pup);
				$el.append($opt);
				var inc = data[treeData.incFld || "inc"];
				if (inc && inc.length > 0) {
					$opt.addClass("non-leaf");
					buildOptions(inc, curLevel + 1, $opt.val());
				}
			}
		}
		buildOptions(treeData.dataArr, 1, "");
		if (treeData.dftVal) $el.val(treeData.dftVal);
	}

	var uniqueIdx = 1;
	function getUniqueValue() {
		return "autoUniqueVal_" + uniqueIdx++;
	}

	function toggleSubOptions(target) {
		$(target.parentNode).toggleClass("opened");
		showHideSub(target.parentNode);
	}

	function showHideSub(ele) {
		var curEle = ele;
		var $options = $(ele).parent(".select2-results__options");
		var shouldShow = true;
		do {
			var pup = ($(curEle).attr("data-pup") || "").replace(/'/g, "\\'");
			curEle = null;
			if (pup) {
				var pupEle = $options.find(".select2-results__option[data-val='" + pup + "']");
				if (pupEle.length > 0) {
					if (!pupEle.eq(0).hasClass("opened")) { // hide current node if any parent node is collapsed
						$(ele).removeClass("showme");
						shouldShow = false;
						break;
					}
					curEle = pupEle[0];
				}
			}
		} while (curEle);
		if (shouldShow) $(ele).addClass("showme");

		var val = ($(ele).attr("data-val") || "").replace(/'/g, "\\'");
		$options.find(".select2-results__option[data-pup='" + val + "']").each(function () {
			showHideSub(this);
		});
	}
})(jQuery);
export function templateFamilleArticleInsert($input) {
	let $modele = $(`<div role="dialog" class="modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Famille d'article</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
            <form class="needs-validation" id="formFamille" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">                           
						<div class="form-outline mb-3 mt-4">
							<input type="text" id="nomFamille" name="nomFamille"
								class="form-control" required />
							<div class="invalid-feedback sty-feedback">
								Le Nom de Famille est obligatoire
							</div>
							<label class="form-label" for="nomFamille">Nom Famille</label>
						</div>
						<div class="form-outline mb-3">
							<input type="text" id="desFamille" name="desFamille"
								class="form-control" />
							<label class="form-label" for="desFamille">Description Famille</label>
						</div>
						<div class="form-check mb-3">
							<input class="form-check-input" type="checkbox" id="wooFamille" />
							<label class="form-check-label" for="wooFamille">Famille
								Woocommerce</label>
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
	$modele.find('#formFamille').on('submit', this, function (event) {
		if (this.checkValidity()) {
			let data = ittone.convertFormToJSON($(this));
			data.wooFamille = $('#wooFamille').is(':checked');
			if ($modele.data('update') && role.update()) {
				data.idFamille = $modele.attr('id');
				data.statment = 'update';
				let param = {
					param: [data]
				}
				let list = insertUpdateFamille(param)[0];
				if (list.idFamille) {
					ittone.success('successfully');
				}

			} else if (!$modele.data('update') && role.insert()) {
				data.statment = 'insert';
				let param = {
					param: [data]
				}
				let list = insertUpdateFamille(param)[0];
				if (list.idFamille) {
					ittone.success('successfully');
					$modele.attr('id', list.idFamille);
				}
			}
			selectFamilleGroup($('#idFamille'));
		}
	});
	$modele.find('.btn-close,.btn-annuler').on('click', this, function () {
		$modele.remove();
	});
}
export function templateArticleInsert(tableRander) {
	let $modele = $(`<div role="dialog" class="modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Article</h5>
                <button type="button" class="btn-close"><i class="fa-solid fa-x"></i></button>
            </div>
            <form class="needs-validation" id="formArticle" novalidate autocomplete="off">
                <span class="radiosStyle">
                    <div class="modal-body">    
					
					<div class="row m-0 mb-3 align-items-center">                       
						<div class="form-outline col-8 col-md-10">
							<input type="text" id="nomArticle" name="nomArticle" class="form-control"
								required />
							<div class="invalid-feedback sty-feedback">
								Le nom d'article est obligatoire
							</div>
							<label class="form-label" for="nomArticle">Nom Article</label>
						</div>
						</div>
						<div class="row m-0 mb-3 align-items-center">
                                    <div class="form-outline col-8 col-md-10">
                                        <input type="text" id="refArticle" name="refArticle" class="form-control"
                                            required />
                                        <div class="invalid-feedback sty-feedback">
                                            Référence d'article est obligatoire
                                        </div>
                                        <label class="form-label" for="refArticle">Référence</label>
                                    </div>
                                    <div class="col-2">
                                        <span class="btn btn-secondary btn-input" id="generRefArticle"><i
                                                class="fa fa-lg fas fa-arrow-left"></i></span>
                                    </div>
                        </div>
						<div class="mb-3">
							<label for="idFamille" class="form-label">Famille d'Article</label>
							<select class="form-select" name="idFamille" id="idFamille2">
							</select>
						</div>
						<div class="mb-3">
                                    <label for="idTaxeAchat" class="form-label">Taxe d'Achat</label>
                                    <select class="form-select" name="idTaxeAchat" id="idTaxeAchat">
                                    </select>
                        </div>
                        <div class="mb-3">
                                    <label for="idTaxeVente" class="form-label">Taxe de Vente</label>
                                    <select class="form-select" name="idTaxeVente" id="idTaxeVente">
                                    </select>
                        </div>
						<div class="form-outline mb-3">
                                    <input type="text" id="prixAchat_HT" name="prixAchat_HT"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixAchat_HT">Prix d'Achat HT</label>
                                </div>
                                <div class="form-outline mb-3">
                                    <input type="text" id="prixVente_HT" name="prixVente_HT"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="prixVente_HT">Prix de Vente HT</label>
                                </div>
								<div class="form-outline mb-3">
								<input type="text" id="prixAchat_TTC" name="prixAchat_TTC"
									class="form-control form-control-lg" />
								<label class="form-label" for="prixAchat_TTC">Prix d'Achat TTC</label>
							</div>
							<div class="form-outline mb-3">
								<input type="text" id="prixVente_TTC" name="prixVente_TTC"
									class="form-control form-control-lg" />
								<label class="form-label" for="prixVente_TTC">Prix de Vente TTC</label>
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
	selectTaxeVente($('#idTaxeVente'));
	selectTaxeAchat($('#idTaxeAchat'));
	selectFamilleGroup($('#idFamille2'));
	$modele.find('#formArticle').on('submit', this, function (event) {
		if (this.checkValidity()) {
			let data = ittone.convertFormToJSON($(this));
			data.achatArticle = true;
			data.venteArticle = true;
			let pourCent = ((data.prixVente_HT - data.prixAchat_HT) / data.prixAchat_HT) * 100;
			if (pourCent == Infinity) {
				pourCent = 100;
			} else {
				if (isNaN(pourCent)) {
					pourCent = 0;
				} else {
					pourCent = (pourCent.toFixed(2));
				}
			}
			data.pourCentArticle = pourCent;
			if ($modele.data('update') && role.update()) {
				data.idArticle = $modele.attr('id');
				data.statment = 'update';
				let param = {
					param: [data]
				}
				let list = insertUpdateArticle(param)[0];
				if (list.idArticle) {
					ittone.success('successfully');
					ittone.updateInDataTable(tableRander, list, list.idArticle)
				}
			} else if (!$modele.data('update') && role.insert()) {
				data.statment = 'insert';
				let param = {
					param: [data]
				}
				let list = insertUpdateArticle(param)[0];
				if (list.idArticle) {
					ittone.success('successfully');
					ittone.addInDataTable(tableRander, list)
					$modele.attr('id', list.idArticle);
					$modele.data('update', true);
				}
			}
		}
	});
	$modele.find('.btn-close,.btn-annuler').on('click', this, function () {
		$modele.remove();
	});
	$modele.find('#generRefArticle').on('click', this, function () {
		let data = GenerateurCode();
		if (data.length) {
			let refArticle = data[0].refArticle;
			refArticle = parseInt(refArticle.substring(2, refArticle.length)) + 1;
			$modele.find('#refArticle').setVal("AR" + ittone.stringWithZero(refArticle, 4));
		} else {
			$modele.find('#refArticle').setVal("AR00001");
		}
	});
	$modele.find('#prixAchat_HT,#prixVente_HT').on('change keyup', this, function () {
		let prixAchat_HT = +$modele.find('#prixAchat_HT').val();
		let prixAchat_TTC = +$modele.find('#prixAchat_TTC').val();
		let prixVente_HT = +$modele.find('#prixVente_HT').val();
		let prixVente_TTC = +$modele.find('#prixVente_TTC').val();
		let taxeAchat = $modele.find('#idTaxeAchat').select2('data')[0].data;
		let taxeVente = $modele.find('#idTaxeVente').select2('data')[0].data;
		if (taxeAchat) {
			taxeAchat = taxeAchat.cauxTaxe;
			prixAchat_TTC = (parseFloat(prixAchat_HT) * (1 + (taxeAchat / 100))).toFixed(2);
			$modele.find('#prixAchat_TTC').setVal(prixAchat_TTC);
		} else {
			taxeAchat = 0;
			$modele.find('#prixAchat_TTC').setVal(prixAchat_HT);
		}
		if (taxeVente) {
			taxeVente = taxeVente.cauxTaxe;
			prixVente_TTC = (parseFloat(prixVente_HT) * (1 + (taxeVente / 100))).toFixed(2);
			$modele.find('#prixVente_TTC').setVal(prixVente_TTC);
		} else {
			taxeVente = 0;
			$modele.find('#prixVente_TTC').setVal(prixVente_HT);
		}
	});
	$modele.find('#prixAchat_TTC,#prixVente_TTC').on('change keyup', this, function () {
		let prixAchat_HT = +$modele.find('#prixAchat_HT').val();
		let prixAchat_TTC = +$modele.find('#prixAchat_TTC').val();
		let prixVente_HT = +$modele.find('#prixVente_HT').val();
		let prixVente_TTC = +$modele.find('#prixVente_TTC').val();
		let taxeAchat = $modele.find('#idTaxeAchat').select2('data')[0].data;
		let taxeVente = $modele.find('#idTaxeVente').select2('data')[0].data;
		if (taxeAchat) {
			taxeAchat = taxeAchat.cauxTaxe;
			prixAchat_HT = (parseFloat(prixAchat_TTC) / (1 + (taxeAchat / 100))).toFixed(2);
			$modele.find('#prixAchat_HT').setVal(prixAchat_HT);
		} else {
			taxeAchat = 0;
			$modele.find('#prixAchat_HT').setVal(prixAchat_TTC);
		}
		if (taxeVente) {
			taxeVente = taxeVente.cauxTaxe;
			prixVente_HT = (parseFloat(prixVente_TTC) / (1 + (taxeVente / 100))).toFixed(2);
			$modele.find('#prixVente_HT').setVal(prixVente_HT);
		} else {
			taxeVente = 0;
			$modele.find('#prixVente_HT').setVal(prixVente_TTC);
		}
	});
}