<?php

namespace X3ddario\TagColorSwissArmyKnife;

use Flarum\Extend;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\Tags\Tag;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Event)
        ->subscribe(TagEventSubscriber::class),

    (new Extend\ApiSerializer(TagSerializer::class))
        ->attributes(function (TagSerializer $serializer, Tag $tag, array $attributes) {
            $attributes['textColor'] = (string) $tag->text_color;
            $attributes['discussionHeroColorMode'] = (string) $tag->discussion_hero_color_mode;

            return $attributes;
        })
];
