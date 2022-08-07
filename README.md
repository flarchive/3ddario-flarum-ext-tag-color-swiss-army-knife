# Tag color Swiss Army knife

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/3ddario/flarum-ext-tag-color-swiss-army-knife.svg)](https://packagist.org/packages/3ddario/flarum-ext-tag-color-swiss-army-knife) [![Total Downloads](https://img.shields.io/packagist/dt/3ddario/flarum-ext-tag-color-swiss-army-knife.svg)](https://packagist.org/packages/3ddario/flarum-ext-tag-color-swiss-army-knife)

A [Flarum](http://flarum.org) extension that allows color customization of tags and enforces the new colors across the forum interface.

## Installation

Install with composer:

```sh
composer require 3ddario/flarum-ext-tag-color-swiss-army-knife:"*"
```

## Updating

```sh
composer update 3ddario/flarum-ext-tag-color-swiss-army-knife:"*"
php flarum migrate
php flarum cache:clear
```

## Configuration

Enable the extension under the **Extensions** tab in the admin area.

Right now the extension itself doesn’t need further configuration. When enabled, it adds an input form in the `EditTagModal` (**Tags** tab in the admin area > click on the pencil icon next to the tag you want to edit). If leaved empty, the default Flarum behavior applies.

## Links

- [Packagist](https://packagist.org/packages/3ddario/flarum-ext-tag-color-swiss-army-knife)
- [GitHub](https://github.com/3ddario/flarum-ext-tag-color-swiss-army-knife)

