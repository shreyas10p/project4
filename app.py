from flask import Flask,render_template,request,jsonify
import requests
from utils import *
import json
from pygooglenews import GoogleNews 
import time

app = Flask(__name__,template_folder='views',static_folder='views')
config = load_config('project.yaml')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search/tweets',methods=['GET'])
def searchTweets():
    searchInput = request.args.get('searchinput')
    poi = request.args.get('poi')
    country = request.args.get('country')
    print(country)
    language = request.args.get('lang')
    topic = request.args.get('topic')
    host = config['solr']
    print(host)
    query = '{}'.format(host)+'solr/IRF20P4/edismax_sh?fl=*%2Cscore&'
    if(searchInput is not None):
        query += 'q=full_text%3A'+searchInput
    else:
        query += 'q=*%3A*'
    print(query)
    if(poi is not None):
        query += '&fq=user.screen_name%3A'+poi
    if(country is not None):
        query += '&fq=country%3A'+country
    if(language is not None):
        query += '&fq=tweet_lang%3A'+language
    if(topic is not None):
        query += '&fq=hashtags%3A'+topic
    print("q",query)
    # data = requests.get('{}'.format(host)+'solr/IRF20P4/select?fq=country%3A'+country+'&fq=user.screen_name%3A'+poi+'&q=full_text%3A'+searchInput)
    response = requests.get(query)
    if(response.status_code == 200):
        resJson = response.json()
        print(resJson['grouped'])
        if(resJson['responseHeader']['status'] == 0):
            data = []
            for doclist in resJson['grouped']['unique_field_text']['groups']:
                for doc in doclist['doclist']['docs']:
                    data.append(doc)
                    score = doc.get('user.followers_count',[0])[0]
                    +doc.get('retweet_count',[0])[0]*2+doc.get('favorite_count',[0])[0]
                doc['score'] = score
            docsCount = resJson['grouped']['unique_field_text']['matches']
        else:
            return jsonify(status = 400,data="Error in response")
    else:
        return jsonify(status=response.status_code,data = "Error",docsCount=0)
    return jsonify(status = 200,data=data,docsCount=docsCount)

@app.route('/search/news',methods=['GET'])
def searchNews():
    
    searchInput = request.args.get('searchinput')
    poi = request.args.get('poi')
    country = request.args.get('country')
    language = request.args.get('lang')
    googlenews = GoogleNews(lang = 'en', country = 'US')
    if(country == 'India'):
        googlenews = GoogleNews(lang = 'hi', country = 'IN')
    elif(country == 'Italy'):
        googlenews = GoogleNews(lang = 'it', country = 'IT')
    
    search = googlenews.search(str(searchInput)+str(poi), 
    helper = True, when = None, from_ = None, to_ = None, proxies=None, scraping_bee=None)
    
    return jsonify(status = 200,data=search)

@app.route('/get/poi/sentiment',methods=['GET'])
def getsentimentData():
    time.sleep(1)
    country = request.args.get('country') 
    pos = []
    neg = []
    neu = []
    with open('db.json') as f:
        print(f)
        data = json.loads(f.read())

    data = data[country]
    labels = data['poi'].keys()    
    for label in labels:
        pos.append(data['poi'][label]['positive_tweets'])
        neg.append(data['poi'][label]['negative_tweets'])
        neu.append(data['poi'][label]['neutral_tweets'])
    return jsonify(labels=list(labels),pos=pos,neg=neg,neu=neu)

@app.route('/get/country/sentiment',methods=['GET'])
def getcountryAnalysis():
    time.sleep(1)
    country = request.args.get('country')
    with open('db.json') as f:
        data = json.loads(f.read())
    data = data[country]
    return jsonify(data=[data['positive_tweets'],data['neutral_tweets'],data['negative_tweets']]
    ,total=data['totaltweets'])

@app.route('/get/covid/tweets',methods=['GET'])
def getCovidTweets():
    time.sleep(1)
    country = request.args.get('country')
    with open('db.json') as f:
        data = json.loads(f.read())
    data = data[country]
    covid_t = []
    non_cov = []
    labels = data['poi'].keys()
    for label in labels:
        covid_t.append(data['poi'][label]['covid_tweets'])
        non_cov.append(data['poi'][label]['total_tweets']-data['poi'][label]['covid_tweets'])
    return jsonify(labels=list(labels),covid_t=covid_t,non_cov=non_cov)

@app.route('/get/real/time',methods=['GET'])
def getRealtme():
    country = request.args.get('country')
    response = requests.get('https://api.covid19tracking.narrativa.com/api/country/'+country+'?date_from=2020-09-15&date_to=2020-09-21')
    print(response.json())
    return jsonify(response.json())