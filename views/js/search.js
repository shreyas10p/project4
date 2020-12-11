$('#poi-dropdown li').on('click', function(){
    let query = $('#search-field').val();
    $("#poi-button").text($(this).text());
    $("#poi-button").val($(this).attr('val'));
    let poi = $('#poi-button').val();
    let language = $('#language-button').val();
    let topic = $('#topic-button').val();
    let country = $('#country-button').val();
    let params = {};
    if(query){
        params['searchinput'] = query;
    }
    if(poi){
        params['poi'] = poi
    }
    if(language){
        params['lang'] = language
    }
    if(country){
        params['country'] = country
    }
    if(topic){
        params['topic'] = topic
    }
    console.log(params)
    httpGet(params,'search/tweets',appendSearchData);
});

$('#country-dropdown li').on('click', function(){
    let query = $('#search-field').val();
    $("#country-button").text($(this).text());
    $("#country-button").val($(this).attr('val'));
    let poi = $('#poi-button').val();
    let language = $('#language-button').val();
    let topic = $('#topic-button').val();
    let country = $('#country-button').val();
    let params = {};
    if(query){
        params['searchinput'] = query;
    }
    if(poi){
        params['poi'] = poi
    }
    if(language){
        params['lang'] = language
    }
    if(country){
        params['country'] = country
    }
    if(topic){
        params['topic'] = topic
    }
    console.log(params)
    httpGet(params,'search/tweets',appendSearchData);
    httpGet(params,'search/news',appendNewsData);
});

$('#language-dropdown li').on('click', function(){
    let query = $('#search-field').val();
    $("#language-button").text($(this).text());
    $("#language-button").val($(this).attr('val'));
    let poi = $('#poi-button').val();
    let language = $('#language-button').val();
    console.log(language)
    let topic = $('#topic-button').val();
    let country = $('#country-button').val();
    console.log(country)
    let params = {};
    if(query){
        params['searchinput'] = query;
    }
    if(poi){
        params['poi'] = poi
    }
    if(language){
        params['lang'] = language
    }
    if(country){
        params['country'] = country
    }
    if(topic){
        params['topic'] = topic
    }
    httpGet(params,'search/tweets',appendSearchData);
    httpGet(params,'search/news',appendNewsData);
});

$('#topic-dropdown li').on('click', function(){
    let query = $('#search-field').val();
    $("#topic-button").text($(this).text());
    $("#topic-button").val($(this).attr('val'));
    let poi = $('#poi-button').val();
    let language = $('#language-button').val();
    let topic = $('#topic-button').val();
    let country = $('#country-button').val();
    let params = {};
    if(query){
        params['searchinput'] = query;
    }
    if(poi){
        params['poi'] = poi
    }
    if(language){
        params['lang'] = language
    }
    if(country){
        params['country'] = country
    }
    if(topic){
        params['topic'] = topic
    }
    httpGet(params,'search/tweets',appendSearchData);
    httpGet(params,'search/news',appendNewsData);
});

$( "#search-query" ).click(function() {
    let query = $('#search-field').val();
    let poi = $('#poi-button').val();
    let language = $('#language-button').val();
    let topic = $('#topic-button').val();
    let country = $('#country-button').val();
    let params = {};
    if(query){
        params['searchinput'] = query;
    }
    if(poi){
        params['poi'] = poi
    }
    if(language){
        params['lang'] = language
    }
    if(country){
        params['country'] = country
    }
    if(topic){
        params['topic'] = topic
    }
    httpGet(params,'search/tweets',appendSearchData);
    httpGet(params,'search/news',appendNewsData);
});

$('#sen-country-dropdown li').on('click', function(){
    $("#sen-country-button").text($(this).text());
    $("#sen-country-button").val($(this).attr('val'));
    $('#sentiment-bar').remove();
    $('#append-canvas').append('<canvas id="sentiment-bar"><canvas>');
    let params = {};
    params['country'] = $(this).attr('val')
    httpGet(params,'get/poi/sentiment',getPOIGraphs);
});

$('#tot-country-dropdown li').on('click', function(){
    $("#tot-country-button").text($(this).text());
    $("#tot-country-button").val($(this).attr('val'));
    $('#sentiment-us').remove();
    $('#append-can-pie').append('<canvas id="sentiment-us"><canvas>');
    let params = {};
    params['country'] = $(this).attr('val');
    httpGet(params,'get/country/sentiment',pieChart);
});

$('#topic-country-dropdown li').on('click', function(){
    $("#topic-country-button").text($(this).text());
    $("#topic-country-button").val($(this).attr('val'));
    $('#line-bar').remove();
    $('#topic-append-canvas').append('<canvas id="line-bar"><canvas>');
    let params = {};
    params['country'] = $(this).attr('val');
    httpGet(params,'get/covid/tweets',lineChart);
});

$('#search-field').keypress(function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        $('#search-query').click();
    }
    
});


function appendSearchData(data){
    $('#tweet-card-body').html('');
    let tweets = data.data; 
    let tweetsNum = tweets.length;
    if(tweetsNum > 0){
        var tweet = "<h4>Total Search Results:<label>"+data.docsCount+"</label> </h4>"
        for(var i =0;i<tweetsNum;i++){
            tweet+= "<p><b>Tweet ID</b>:"+tweets[i].id+"</p>\
            <p><b>Influencer Score:</b>"+Math.round(tweets[i].score*100)/100+"</p>\
            <p><b>Username:</b>"+tweets[i]["user.name"][0]+"</p>\
            <p><b>User ID:</b>"+tweets[i]["user.id"][0]+"</p>\
            <p><b>Tweet text:</b>"+tweets[i].tweet_text[0]+"</p>\
            <p><b>country:</b>"+tweets[i].country[0]+"</p>\
            <p><b>Tweet date:</b>"+tweets[i].tweet_date.toString()+"</p>\
            <p><b>Tweet Language:</b>"+tweets[i].tweet_lang[0]+"</p>\
            <hr class='solid'>\
        "
        }
        $('#tweet-card-body').append(tweet);
        console.log(data);
    } else{
        $('.toast').toast('show');
    }
}

function appendNewsData(data){
    console.log(data);
    let newsentry = data.data.entries;
    let dataLen = newsentry.length;
    $('#news-articles').html('');
    var news = "<h4>News Articles</h4>";
    for(var i=0;i<dataLen;i++){    
    news+= "<p><label><b>Title: </b>:"+newsentry[i].title+"</label>\
        <label><b>Link: </b><a href='"+newsentry[i].link+"' target='_blank'>"+newsentry[i].link+"</a></label>\
        <label><b>published date: </b>"+newsentry[i].published+"</label></p>\
        <hr class='solid'>\
    "
    }
    $('#news-articles').append(news);

}