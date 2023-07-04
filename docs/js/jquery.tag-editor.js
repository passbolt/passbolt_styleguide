/**
 * A simple tagEditor plugin for jQuery
 *
 * @copyright(c) 2020 Passbolt SA
 * @licence MIT License
 */

$(function() {
  $.fn.tagEditor = function (userConfig) {

    // Configuration
    // we merge the default and the given data using 'deep' extend feature
    // see. http://api.jquery.com/jQuery.extend/
    config = $.extend(true, {
      checkDuplicates: true,
      prefixSelectors: true,
      startTags : [],
      selector: {
        tagEditorInput: '.tag-editor-input',
        tagSubmit: '.tag-editor-submit',
        tags: '.tags'
      },
      onSave : function() {
        console.log('onSave callback is not defined')
      },
      onChange : function () {}
    }, userConfig || {});

    // The plugin return itself so that you can chain
    return this.each(function() {

      /**
       * Init the tag editor
       * @param {string} tagEditorId
       */
      function main(tagEditorId) {
        // Selector values helper
        config.selector.main = tagEditorId;
        if (config.prefixSelectors) {
          config.selector.tagEditorInput = config.selector.main + ' ' + config.selector.tagEditorInput;
          config.selector.tagSubmit = config.selector.main + ' ' + config.selector.tagSubmit;
          config.selector.tags = config.selector.main + ' ' + config.selector.tags;
          config.selector.tagDeleteButton = config.selector.main + ' .tag-delete';
          config.selector.tagContent = config.selector.main + ' .tag-content';
        }

        if (config.startTags.length > 0) {
          config.startTags.forEach(function (tag) {
            createTag(tag, true);
          });
        }

        // Bind click on tag editor event
        $(config.selector.main).click(function () {
          setFocus();
        });

        // Bind handle when pasting in input
        $(config.selector.tagEditorInput).bind("paste", function (event) {
          onPaste(event);
        });

        // Bind handle when typing in the input
        $(config.selector.tagEditorInput).keypress(onKeyPress);

        // Bind focus events
        $(config.selector.tagEditorInput).focusin(function() {
          $('.tag-editor-input-wrapper').addClass('input-focus');
        });
        $(config.selector.tagEditorInput).blur(function() {
          $('.tag-editor-input-wrapper').removeClass('input-focus');
        });

        $(config.selector.tagSubmit).click(onSubmit);

        bindDeleteButtons();
      }

      /**
       * Sanitize a user land string for tags
       * @param {string} unsafe
       * @returns {string} safe
       */
      function sanitize(unsafe) {
        return unsafe
          .replace(/<br>/g, "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/\n/g, "")
          .replace(/\t/g, "")
          .trim();
      }

      /**
       * Place focus in input text field
       */
      function setFocus() {
        $(config.selector.tagEditorInput).focus();
      }

      /**
       * Add the tag to the existing list
       * @param {string} tag
       * @param {bool} skipOnChange skip onChange callback
       */
      function createTag(tag, skipOnChange) {
        // Do not add if it's already there
        if (config.checkDuplicates) {
          var existingTags = getAllTags();
          if (existingTags.indexOf(tag) > -1) {
            flashTag(tag);
            return;
          }
        }

        // keep \n in template for regular spacing
        var html = '<div class="tag">\n' +
          '<span class="tag-content">' + sanitize(tag) + '</span>\n' +
          '<span class="tag-delete"><i class="fa fa-times"></i></span>\n' +
          '</div>';
        $(config.selector.tags).append(html);

        bindDeleteButtons();

        // notify changes
        if (!skipOnChange) {
          config.onChange(getAllTags());
        }
      }

      /**
       * Get the current value of the text input
       * @return {string|bool}
       */
      function getInputValue() {
        var html = $(config.selector.tagEditorInput).html();
        if (html === '' || html === '<br>') {
          return false;
        } else {
          return html;
        }
        // return $(config.selector.tagEditorInput).val();
      }

      /**
       * Reset the value of the tag text input
       */
      function resetInputValue() {
        $(config.selector.tagEditorInput).empty();
      }

      /**
       * When a key is pressed
       * @param {jQuery.Event} event
       */
      function onKeyPress(event) {
        if (event.which === 8) { /* on delete */
          onPressDelete(event);
          return;
        }
        if (event.which === 13 || event.which === 44 || event.which === 59) { /* on enter or , or ; */
          onPressEnter(event);
          return;
        }
        if (event.which === 0 && !event.shiftKey) { /* on tab move focus to save button */
          $(config.selector.tagSubmit).focus();
          event.preventDefault();
        }
      }

      /**
       * When user press backspace
       * @param {jQuery.Event} event
       */
      function onPressDelete(event) {
        if (!getInputValue()) {
          $(config.selector.tags + ' .tag').last().remove();
          config.onChange(getAllTags());
          event.preventDefault();
        }
      }

      /**
       * When user press enter(or , or ;)
       * @param {jQuery.Event} event
       */
      function onPressEnter(event) {
        if (getInputValue()) {
          createTag(getInputValue());
          resetInputValue();
        }
        event.preventDefault();
      }

      /**
       * When user submit for save
       * @param event
       */
      function onSubmit(event) {
        if (getInputValue()) {
          createTag(getInputValue());
        }
        config.onSave(getAllTags());
        resetInputValue();
        event.preventDefault();
      }

      /**
       * When user paste in the field
       * @param {jQuery.Event} event
       */
      function onPaste(event) {
        var pastedData = event.originalEvent.clipboardData.getData('text');
        var tags = pastedData.split(new RegExp(',|;', 'g'));
        tags.forEach(function (tag) {
          if (tag) {
            createTag(tag);
          }
        });
        event.preventDefault();
      }

      /**
       * Delete tag clicking on a tag 'x'
       */
      function bindDeleteButtons() {
        $(config.selector.tagDeleteButton).click(function () {
          $(this).parent().remove();
        });
      }

      /**
       * Return all the tags currently set in editor
       * @returns {Array}
       */
      function getAllTags() {
        var tags = [];
        $(config.selector.tagContent).each(function () {
          tags.push($(this).html());
        });
        return tags;
      }

      /**
       * Flash a given tag
       * @param {string} tag
       */
      function flashTag(tag) {
        $(config.selector.tagContent).each(function () {
          if($(this).html() === tag) {
            var _this = this;
            $(_this).toggleClass('blink-fast');
            setTimeout(function(){ $(_this).toggleClass('blink-fast'); }, 500);
          }
        });
      }

      // starts
      main('#' + this.id);

    });
  };
});