# 1. This tells docker to use the Rust official image
FROM python:3

# 2. Copy the files in your machine to the Docker image
COPY ./ ./

# Build your program for release
RUN pip install --no-cache-dir -r requirements.txt
RUN python manage.py migrate
#RUN python manage.py runserver
#RUN python3 -m venv venv
#RUN source venv/bin/activate

#COPY ./ ./

# Run the binary
CMD [ "python", "./manage.py", "runserver" ]
