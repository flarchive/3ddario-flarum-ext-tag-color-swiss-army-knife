<?php

use Flarum\Database\Migration;

return Migration::addColumns('tags', [
    'discussion_hero_color_mode' => ['string', 'default' => 'flarum_vanilla', 'length' => 32, 'nullable' => false]
]);
