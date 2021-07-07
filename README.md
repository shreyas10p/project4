# project4 

## Tweets Search

### REQUIREMENTS

- Flask
- Solr-8.2.0
- Chart.js
- JQuery
- Docker

### FEATURES
Video of webpage - https://youtu.be/zr_5UX-IA-8

- Developed a search engine for searching tweets by indexing tweets in Solr-8.2.0 and host the search engine on webpage.
- Calculated how every tweet is influencing the number of people by calculating influencer score for every tweet.
- Performed sentiment analysis on every tweet.
- Performed topic analysis on the indexed tweets.
- Shown insights and analysis on the indexed and collected tweets on the webpage. (Chart.js is used to make graphs and charts) 


### USAGE
Use the following commands to build servers using docker.

1. docker-compose build
2. docker-compose up -d
