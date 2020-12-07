FROM python:3.6.5
LABEL author = "Shreyas Pimpalkar"

COPY . /var/www
WORKDIR /var/www
RUN pip install -r requirements.txt

EXPOSE 5000
CMD [ "flask","run" ]