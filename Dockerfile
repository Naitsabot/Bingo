FROM python:3.11

#COPY ./docker-entrypoint.sh /entrypoint
#RUN sed -i 's/\r$//g' /entrypoint
#RUN chmod +x /entrypoint

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput
RUN python manage.py migrate

CMD [ "python", "manage.py", "runserver" ]
#ENTRYPOINT ["/entrypoint"]
