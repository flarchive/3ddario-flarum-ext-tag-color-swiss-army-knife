import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import IndexPage from 'flarum/forum/components/IndexPage';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import TagsPage from 'flarum/tags/components/TagsPage';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import DiscussionHero from 'flarum/forum/components/DiscussionHero';
import TagDiscussionModal from 'flarum/tags/components/TagDiscussionModal';
import EventPost from 'flarum/forum/components/EventPost';

app.initializers.add('3ddario/flarum-ext-tag-color-swiss-army-knife', () => {
  extend(IndexPage.prototype, 'oncreate', function () {
    if (this.attrs.routeName !== 'tag') {
      return;
    }

    const textColor = this.currentTag().attribute('textColor');
    const bgColor = this.currentTag().attribute('color');
    const heroTitleElement = this.element.querySelector('.Hero-title');
    const tagDescriptionElement = this.element.querySelector('.Hero-subtitle');

    const newDiscussionButton = this.element.querySelector('.IndexPage-newDiscussion');

    if (textColor.length > 0) {
      heroTitleElement.style.color = textColor;
      newDiscussionButton.classList.remove('Button--tagColored');
      newDiscussionButton.style.color = textColor;
      newDiscussionButton.style.backgroundColor = bgColor;

      if (tagDescriptionElement) {
        tagDescriptionElement.style.color = textColor;
      }
    }
  });

  extend(DiscussionListItem.prototype, 'oncreate', function () {
    if (!this.element) {
      return;
    }

    this.element.querySelectorAll('.TagLabel').forEach((elem) => {
      const tagChild = elem.firstChild;
      const tagName = tagChild.textContent.trim();

      const tagObject = app.store.getBy('tags', 'name', tagName);
      if (!tagObject) {
        return;
      }
      const tagAttributes = tagObject.data.attributes;

      if ('textColor' in tagAttributes && typeof tagAttributes.textColor === 'string' && tagAttributes.textColor.length > 0) {
        elem.classList.remove('colored');
        tagChild.style.color = tagAttributes.textColor;
      }
    });
  });

  extend(TagsPage.prototype, 'view', function (vdom) {
    vdom.children.forEach((vdom) => {
      if (!vdom || !vdom.attrs || vdom.attrs.className !== 'container') {
        return;
      }

      vdom.children.forEach((vdom) => {
        if (!vdom || !vdom.attrs || vdom.attrs.className !== 'TagsPage-content sideNavOffset') {
          return;
        }

        vdom.children.forEach((vdom) => {
          if (!vdom || !vdom.attrs) {
            return;
          }

          if (vdom.attrs.className === 'TagTiles') {
            vdom.children.forEach((li) => {
              const link = li.children.find((vdom) => vdom && vdom.attrs && vdom.attrs.href);

              if (!link) {
                return;
              }
              const tag = app.store.getBy('tags', 'slug', link.attrs.href.replace('/t/', ''));
              if (!tag.data || !tag.data.attributes) {
                return;
              }

              if (tag.data.attributes.textColor.length > 0) {
                li.attrs.className = li.attrs.className.replace('colored', '');
                li.attrs.style.background = tag.data.attributes.color;
                li.children.forEach((vdom) => {
                  if (!vdom || !vdom.attrs) {
                    return;
                  }

                  if (vdom.dom && vdom.dom.style) {
                    vdom.dom.style.color = tag.data.attributes.textColor;
                  }
                  if (!vdom.attrs.style) {
                    vdom.attrs.style = {
                      color: tag.data.attributes.textColor,
                    };
                  } else {
                    vdom.attrs.style['color'] = tag.data.attributes.textColor;
                  }
                });
              }
            });
          } else if (vdom.attrs.className === 'TagCloud') {
            vdom.children.forEach((li) => {
              const link = li.children.find((vdom) => vdom && vdom.attrs && vdom.attrs.href);

              if (!link) {
                return;
              }

              const tag = app.store.getBy('tags', 'slug', link.attrs.href.replace('/t/', ''));
              if (tag.data.attributes.textColor.length > 0) {
                link.attrs.className = link.attrs.className.replace('colored', '');
                link.children.forEach((vdom) => {
                  if (!vdom || !vdom.attrs) {
                    return;
                  }

                  if (!vdom.attrs.style) {
                    vdom.attrs.style = {
                      color: tag.data.attributes.textColor,
                    };
                  } else {
                    vdom.attrs.style['color'] = tag.data.attributes.textColor;
                  }
                });
              }
            });
          }
        });
      });
    });
  });

  extend(TagDiscussionModal.prototype, 'onupdate', function (vdom) {
    if (!this.element) {
      return;
    }

    const selectedTags = this.element.querySelectorAll('span.TagsInput-tag');
    if (!selectedTags) {
      return;
    }

    selectedTags.forEach((elem) => {
      const tagLabelElem = elem.firstChild;
      if (!tagLabelElem) {
        return;
      }
      const tagName = tagLabelElem.textContent.trim();
      const tagObject = app.store.getBy('tags', 'name', tagName);

      if (!tagObject) {
        return;
      }
      const tagAttributes = tagObject.data.attributes;

      if (tagAttributes.textColor.length > 0) {
        tagLabelElem.classList.remove('colored');
        tagLabelElem.firstChild.style.color = tagAttributes.textColor;
        tagLabelElem.style.color = tagAttributes.color;
      }
    });
  });

  extend(DiscussionComposer.prototype, 'onupdate', function () {
    if (!this.element) {
      return;
    }

    this.element.querySelectorAll('span.TagLabel.colored').forEach((elem) => {
      const tagName = elem.textContent.trim();
      const tagObject = app.store.getBy('tags', 'name', tagName);

      if (!tagObject) {
        return;
      }
      const tagAttributes = tagObject.data.attributes;

      if (tagAttributes.textColor.length > 0) {
        elem.classList.remove('colored');

        elem.firstChild.style.color = tagAttributes.textColor;
        elem.firstChild.style.backgroundColor = tagAttributes.color;
      }
    });
  });

  extend(DiscussionHero.prototype, 'oncreate', function () {
    if (!this.element) {
      return;
    }

    const elems = this.element.querySelectorAll('.TagLabel');
    let firstTagAttributes;

    for (let i = 0; i < elems.length; i++) {
      const elem = elems[i];

      const tagName = elem.textContent.trim();

      const tagObject = app.store.getBy('tags', 'name', tagName);

      if (!tagObject) {
        return;
      }

      const tagAttributes = tagObject.data.attributes;

      if (i === 0) {
        if (tagAttributes.textColor.length === 0) {
          // First tag doesn't have custom text color so the extension does nothing
          break;
        }
        if (tagAttributes.discussionHeroColorMode === 'flarum_vanilla') {
          // Default styling applies
          break;
        }
        firstTagAttributes = tagAttributes;

        this.element.style.removeProperty('--hero-bg');
        this.element.classList.remove('DiscussionHero--colored');

        switch (firstTagAttributes.discussionHeroColorMode) {
          case 'primary_bg_tag_full_color':
            const forumPrimaryColor = getComputedStyle(this.element).getPropertyValue('--primary-color');
            const forumPSecondaryColor = getComputedStyle(this.element).getPropertyValue('--secondary-color');

            this.element.style.backgroundColor = forumPrimaryColor;
            this.element.querySelector('.DiscussionHero-title').style.color = forumPSecondaryColor;
            break;
          case 'tag_text_as_bg_tag_full_color':
            this.element.style.backgroundColor = tagAttributes.color;
            this.element.querySelector('.DiscussionHero-title').style.color = tagAttributes.textColor;
            break;
          case 'tag_bg_as_bg_tag_full_color':
            this.element.style.backgroundColor = tagAttributes.textColor;
            this.element.querySelector('.DiscussionHero-title').style.color = tagAttributes.color;
            break;
        }
      }

      if (tagAttributes.textColor.length > 0) {
        switch (firstTagAttributes.discussionHeroColorMode) {
          case 'primary_bg_tag_full_color':
            elem.classList.remove('colored');
            elem.firstChild.style.color = tagAttributes.textColor;
            elem.style.backgroundColor = tagAttributes.color;
            break;
          case 'tag_text_as_bg_tag_full_color':
            elem.classList.remove('colored');
            elem.firstChild.style.color = tagAttributes.color;
            elem.style.backgroundColor = tagAttributes.textColor;
            break;
          case 'tag_bg_as_bg_tag_full_color':
            elem.classList.remove('colored');
            elem.firstChild.style.color = tagAttributes.textColor;
            elem.style.backgroundColor = tagAttributes.color;
            break;
        }
      }
    }
  });

  extend(EventPost.prototype, 'oncreate', function () {
    if (!this.element || !this.attrs || !('tagsAdded' in this.attrs)) {
      return;
    }

    this.element.querySelectorAll('a.TagLabel.colored').forEach((elem) => {
      if (!elem.attributes || typeof elem.attributes.href !== 'object') {
        return;
      }
      const tagSlug = elem.attributes.href.value.replace('/t/', '');
      const tag = app.store.getBy('tags', 'slug', tagSlug);

      if (!tag) {
        return;
      }

      const tagAttributes = tag.data.attributes;
      if (tag.data.attributes.textColor.length > 0) {
        elem.classList.remove('colored');
        elem.firstChild.style.color = tagAttributes.textColor;
        elem.style.color = tagAttributes.color;
      }
    });
  });
});
