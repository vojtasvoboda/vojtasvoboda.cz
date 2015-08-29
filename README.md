# vojtasvoboda.cz

Site www.vojtasvoboda.cz

## Installation

```
composer install
sudo npm install
cd themes/fortissimoprague/
sudo npm install
bower install
grunt tasks
grunt build_dev OR grunt build
grunt watch (waiting for file changes)
```

## Environment setup

Create file .env from .env.dist - set local database, app key

This file contains all environment variables - database config, app key, environment name, localhost URL etc.

Example file:

```
APP_ENV=dev
DATABASE_NAME=fortissimo
DATABASE_USER=root
DATABASE_PASSWORD=
ENCRYPTION_KEY=D04IKlhSqSaTxW7aJnY5tOpT4Nwd1UrD
ENCRYPTION_CIPHER=rijndael-128
BASE_URL=http://localhost:8000
```

## Debug on

Create PHP file /config/dev/app.php with content:

```
return [
    'debug' => true
];
```

and set production to 'dev' in .env file. This /dev/app.php basically overrides /config/app.php file.

## Local database setup

Two way:

- download production database
- or run command `php artisan october:up` which builds database from migrations and seeds

## Project run

`php artisan serve` - starts PHP 5.4. built-in server (same as run `php -S localhost:8000`)

## Delete cache

`php artisan cache:clear`