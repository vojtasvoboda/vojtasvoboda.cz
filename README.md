# vojtasvoboda.cz

Site www.vojtasvoboda.cz

## Installation

```
composer install
sudo npm install
cd themes/vojtasvoboda/
sudo npm install
bower install
```

But bower install is not neccessary, because assets/vendor folder is already in Git repository.

## Static variant

There is static (pre-rendered) variant of the website in /static folder.

## Debug on

Create PHP file /config/dev/app.php with content:

```
return [
    'debug' => true
];
```

and set production to 'dev' in .env file. This /dev/app.php basically overrides /config/app.php file.

## Project run on localhost

`php artisan serve` - starts PHP 5.4. built-in server (same as run `php -S localhost:8000`)

## Delete cache

`php artisan cache:clear`
