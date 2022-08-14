import { extend } from 'flarum/common/extend';
import app from 'flarum/admin/app';
import ColorPreviewInput from 'flarum/common/components/ColorPreviewInput';
import Select from 'flarum/common/components/Select';
import Stream from 'flarum/common/utils/Stream';

import EditTagModal from 'flarum/tags/admin/components/EditTagModal';

app.initializers.add('3ddario/flarum-ext-tag-color-swiss-army-knife', () => {
  extend(EditTagModal.prototype, 'oninit', function () {
    this.textColor = Stream(this.tag.attribute('textColor') || '');
    this.discussionHeroColorMode = Stream(this.tag.attribute('discussionHeroColorMode') || 'flarum_vanilla');
  });

  extend(EditTagModal.prototype, 'submitData', function (data) {
    data.textColor = this.textColor();
    data.discussionHeroColorMode = this.discussionHeroColorMode();
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

    items.add(
      'discussionHeroColorMode',
      <div className="Form-group">
        <label>{app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.label')} </label>
        <div className="helpText">
          {app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.helptext', {
            a: <a href="https://github.com/3DDario/flarum-ext-tag-color-swiss-army-knife/blob/main/README.md#Examples" tabindex="-1" />,
          })}
        </div>
        <Select
          className="FormControl"
          value={this.discussionHeroColorMode()}
          onchange={this.discussionHeroColorMode}
          options={{
            flarum_vanilla: app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.options.flarum_vanilla'),
            primary_bg_tag_full_color: app.translator.trans(
              '3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.options.primary_bg_tag_full_color'
            ),
            tag_text_as_bg_tag_full_color: app.translator.trans(
              '3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.options.tag_text_as_bg_tag_full_color'
            ),
            tag_bg_as_bg_tag_full_color: app.translator.trans(
              '3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.options.tag_bg_as_bg_tag_full_color'
            ),
          }}
        />
        <div className="helpText">
          <br />
          {app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.helptext_flarum_vanilla')}
          <br />
          {app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.helptext_primary_bg_tag_full_color')}
          <br />
          {app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.helptext_tag_text_as_bg_tag_full_color')}
          <br />
          {app.translator.trans('3ddario-tag-color-swiss-army-knife.admin.discussion_hero_color_mode.helptext_tag_bg_as_bg_tag_full_color')}
        </div>
      </div>,
      16
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
