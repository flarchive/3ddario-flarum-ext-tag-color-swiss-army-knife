<?php

namespace X3ddario\TagColorSwissArmyKnife;

use Flarum\Tags\Event\Creating;
use Flarum\Tags\Event\Saving;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class TagEventSubscriber
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Creating::class, [$this, 'handleEvent']);
        $events->listen(Saving::class, [$this, 'handleEvent']);
    }

    public function handleEvent($event)
    {
        $data = $event->data;
        if (Arr::has($data, ['attributes.textColor'])) {
            $textColor = Arr::get($data, 'attributes.textColor');

            $event->tag->text_color = $textColor;
        }
    }
}