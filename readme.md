# Hello
This is a Bit Bingo app written in Django 5.0, uses Python 3.11.

Inspired by and evolved upon this project here: https://github.com/AsbjoernJC/Bingo

# Apps

Bingo in `./bingo`

# Links

- `$base_url/admin/` - Administration, mostly for changing data of bingo numbers hehe
- `$base_url/bingo/` - The bingo app site
- `$base_url/bingo/gen/` - Bingo ticket pdf generator

# Usage

#### Initial startup local enviromentless

1. Install python
2. Install requitements `pip install -r requirements.txt`
- Generate secret key in python shell: `from django.core.management.utils import get_random_secret_key; get_random_secret_key()`
- set .env file: 
```env
DJANGO_SECRET_KEY="INSERT YOUR GENERATED KEY HERE"
DJANGO_DEBUG=False
DJANGO_CSRF_COOKIE_SECURE=True
DJANGO_SESSION_COOKIE_SECURE=True
```
3. `python manage.py migrate`
4. `python manage.py collectstatic`
5. `python manage.py runserver`
6. ...
7. Profit?

#### Initial startup for Ubuntu with virtual envs:

- `Install python3 with pip`
- `sudo apt install python3 python3-pip python3-venv`
- Create virtual environment `python3 -m venv venv`
- Activate virtualenv `source venv/bin/activate`
- Install packages `pip3 install -r requirements.txt`
- Generate secret key in python shell: `from django.core.management.utils import get_random_secret_key; get_random_secret_key()`
- set .env file: 
```env
DJANGO_SECRET_KEY="INSERT YOUR GENERATED KEY HERE"
DJANGO_DEBUG=False
DJANGO_CSRF_COOKIE_SECURE=True
DJANGO_SESSION_COOKIE_SECURE=True
```
- `python manage.py migrate`
- `python manage.py collectstatic`
- ...
- Profit

#### Later

1. `python manage.py runserver`
2. ...
3. Profit?

with gunicorn:
1. `gunicorn Bingo.wsgi` (flags and ip/port may be set also)
2. ...
3. profit?
