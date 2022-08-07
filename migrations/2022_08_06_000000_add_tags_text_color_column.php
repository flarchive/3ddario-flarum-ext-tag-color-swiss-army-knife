<?php

use Flarum\Database\Migration;

return Migration::addColumns('tags', [
    'text_color' => ['string', 'length' => 7, 'nullable' => true]
]);
