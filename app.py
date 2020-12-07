from flask import Flask,render_template,request,jsonify
import requests
from utils import *
import json

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
    topic = request.args.get('topic')
    host = config['solr']
    query = '{}'.format(host)+'solr/IRF20P4/select?'
    if(searchInput is not None):
        query += 'q=full_text%3A'+searchInput
    else:
        query += 'q=*%3A*'
    print(query)
    if(poi is not None):
        query += '&fq=user.screen_name%3A'+poi
    if(country is not None):
        query += '&fq=country%3A'+country
    print("q",query)
    # data = requests.get('{}'.format(host)+'solr/IRF20P4/select?fq=country%3A'+country+'&fq=user.screen_name%3A'+poi+'&q=full_text%3A'+searchInput)
    response = requests.get(query)
    if(response.status_code == 200):
        resJson = response.json()
        if(resJson['responseHeader']['status'] == 0):
            data = resJson['response']
        else:
            return jsonify(status = 400,data="Error in response")
    else:
        return jsonify(status=response.status_code,data = "Error")
    return jsonify(status = 200,data=data)