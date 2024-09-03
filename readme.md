# Hello
This is a Bit Bingo app written in Django

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
3. `python manage.py migrate`
4. `python manage.py runserver`
5. ...
6. Profit?

# Initial startup for Ubuntu with virtual envs:

- `Install python3 with pip`
- `sudo apt install python3 python3-pip python3-venv`
- Create virtual environment `python3 -m venv venv`
- Activate virtualenv `source venv/bin/activate`
- Install packages `pip3 install -r requirements.txt`
- ???
- Profit

#### Later

1. `python manage.py runserver`
2. ...
3. Profit?
