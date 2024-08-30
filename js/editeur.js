
/**
 * Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* exported initSample */

if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
    CKEDITOR.tools.enableHtml5Elements(document);

// The trick to keep the editor in the sample quite small
// unless user specified own height.



CKEDITOR.config.height = 150;
CKEDITOR.config.width = 'auto';
// CKEDITOR.config.contentsLangDirection = 'rtl';
CKEDITOR.config.language = 'fr'
if ($('textarea[name=simple]').length) {
    console.log(12321)
    CKEDITOR.replace('simple', {
        toolbarGroups: [{
            "name": "basicstyles",
            "groups": ["basicstyles"]
        },
        {
            "name": "links",
            "groups": ["links"]
        },
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "styles",
            "groups": ["styles"]
        },],
        removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
    });
}
var initSample = (function () {
    var wysiwygareaAvailable = isWysiwygareaAvailable(),
        isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

    return function () {
        var editorElement = CKEDITOR.document.getById('editor');

        // :(((
        if (isBBCodeBuiltIn) {
            editorElement.setHtml(
                'Hello world!\n\n' +
                'I\'m an instance of [url=https://ckeditor.com]CKEditor[/url].'
            );
        }

        // Depending on the wysiwygarea plugin availability initialize classic or inline editor.
        if (wysiwygareaAvailable) {
            CKEDITOR.replace('editor');
        } else {
            editorElement.setAttribute('contenteditable', 'true');
            CKEDITOR.inline('editor');

            // TODO we can consider displaying some info box that
            // without wysiwygarea the classic editor may not work.
        }
    };

    function isWysiwygareaAvailable() {
        // If in development mode, then the wysiwygarea must be available.
        // Split REV into two strings so builder does not replace it :D.
        if (CKEDITOR.revision == ('%RE' + 'V%')) {
            return true;
        }

        return !!CKEDITOR.plugins.get('wysiwygarea');
    }
})();


CKEDITOR.on('instanceReady', function (ev) {
    // Show the editor name and description in the browser status bar.
    $('#eMessage').html('Instance <code>' + ev.editor.name + '<\/code> loaded.');

    // Show this sample buttons.
    $('#eButtons').css('display', 'block');
});

function InsertHTML() {
    // Get the editor instance that we want to interact with.
    var editor = CKEDITOR.instances.editor;
    var value = document.getElementById('htmlArea').value;

    // Check the active editing mode.
    if (editor.mode == 'wysiwyg') {
        // Insert HTML code.
        // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-insertHtml
        editor.insertHtml(value);
    }
    else
        alert('You must be in WYSIWYG mode!');
}

function InsertText() {
    // Get the editor instance that we want to interact with.
    var editor = CKEDITOR.instances.editor1;
    var value = document.getElementById('txtArea').value;

    // Check the active editing mode.
    if (editor.mode == 'wysiwyg') {
        // Insert as plain text.
        // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-insertText
        editor.insertText(value);
    }
    else
        alert('You must be in WYSIWYG mode!');
}

function SetContents(text) {
    // Get the editor instance that we want to interact with.
    var editor = CKEDITOR.instances.editor;
    var value = text;
    // Set editor contents (replace current contents).
    // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-setData
    editor.setData(value);
}

function GetContents() {
    // Get the editor instance that you want to interact with.
    var editor = CKEDITOR.instances.editor;

    // Get editor contents
    // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-getData
    return editor.getData()
}

function ExecuteCommand(commandName) {
    // Get the editor instance that we want to interact with.
    var editor = CKEDITOR.instances.editor;

    // Check the active editing mode.
    if (editor.mode == 'wysiwyg') {
        // Execute the command.
        // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-execCommand
        editor.execCommand(commandName);
    }
    else
        alert('You must be in WYSIWYG mode!');
}

function CheckDirty() {
    // Get the editor instance that we want to interact with.
    var editor = CKEDITOR.instances.editor;
    // Checks whether the current editor contents present changes when compared
    // to the contents loaded into the editor at startup
    // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-checkDirty
    alert(editor.checkDirty());
}

function ResetDirty() {
    // Get the editor instance that we want to interact with.
    var editor = CKEDITOR.instances.editor;
    // Resets the "dirty state" of the editor (see CheckDirty())
    // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-resetDirty
    editor.resetDirty();
    alert('The "IsDirty" status has been reset');
}

function Focus() {
    CKEDITOR.instances.editor.focus();
}

function onFocus() {
    $('#eMessage').html('<b>' + this.name + ' is focused </b>');
}

function onBlur() {
    $('#eMessage').html(this.name + ' lost focus');
}