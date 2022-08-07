import { extend } from 'flarum/common/extend';
import app from 'flarum/admin/app';
import ColorPreviewInput from 'flarum/common/components/ColorPreviewInput';
import Stream from 'flarum/common/utils/Stream';

import EditTagModal from 'flarum/tags/admin/components/EditTagModal';

app.initializers.add('3ddario/flarum-ext-tag-color-swiss-army-knife', () => {
  extend(EditTagModal.prototype, 'oninit', function () {
    this.textColor = Stream(this.tag.attribute('textColor') || '');
  });

  extend(EditTagModal.prototype, 'submitData', function (data) {
    data.textColor = this.textColor();
  });

  extend(EditTagModal.prototype, 'fields', function (items) {
    const colorInputFormVanilla = items.get('color');

    if (colorInputFormVanilla && colorInputFormVanilla.children) {
      const newColorHelpText = m('div', { class: 'helpText' }, app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.stock_color.helptext'));

      colorInputFormVanilla.children.splice(1, 0, newColorHelpText);
    }

    items.add(
      'textColor',
      <div className="Form-group">
        <label>{app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.text_color.custom_label')} </label>
        <div className="helpText">{app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.text_color.helptext')}</div>
        <ColorPreviewInput className="FormControl" placeholder="#aaaaaa" bidi={this.textColor} />
      </div>,
      15
    );
  });

  extend(EditTagModal.prototype, 'view', function (vdom) {
    const textColor = this.textColor();
    if (textColor.length > 0) {
      vdom.children.forEach((vdom) => {
        if (!vdom || !vdom.attrs || vdom.attrs.className !== 'Modal-content') {
          return;
        }

        vdom.children.forEach((vdom) => {
          if (!vdom || !vdom.tag || vdom.tag !== 'form') {
            return;
          }

          vdom.children.forEach((vdom) => {
            if (!vdom || !vdom.attrs || vdom.attrs.className !== 'Modal-header') {
              return;
            }

            vdom.children.forEach((vdom) => {
              if (!vdom || !vdom.attrs || !vdom.children || vdom.children.length === 0) {
                return;
              }

              const TagLabel = vdom.children[0];
              TagLabel.attrs.className = TagLabel.attrs.className.replace('colored', '');
              TagLabel.attrs.style.background = this.color();

              vdom.children.forEach((vdom) => {
                if (!vdom || !vdom.attrs) {
                  return;
                }

                if (!vdom.attrs.style) {
                  vdom.attrs.style = {
                    color: textColor,
                  };
                } else {
                  vdom.attrs.style['color'] = textColor;
                }
              });
            });
          });
        });
      });
    }
  });
});
