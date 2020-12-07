$('#poi-dropdown li').on('click', function(){
    let query = $('#search-field').val();
    $("#poi-button").text($(this).text());
    $("#poi-button").val($(this).val());
});

$('#country-dropdown li').on('click', function(){
    let query = $('#search-field').val();
    $("#country-button").text($(this).text());
    $("#country-button").val($(this).val());
});

$('#language-dropdown li').on('click', function(){
    let query = $('#search-field').val();
    $("#language-button").text($(this).text());
    $("#language-button").val($(this).val());
});

$('#topic-dropdown li').on('click', function(){
    let query = $('#search-field').val();
    $("#topic-button").text($(this).text());
    $("#topic-button").val($(this).val());
});

$( "#search-query" ).click(function() {
    let query = $('#search-field').val();
    let poi = $('#poi-button').val();
    let language = $('#language-button').val();
    let topic = $('#topic-button').val();
    let params = {};
    if(query){
        params['searchinput'] = query;
    }
    if(poi){
        params['poi'] = poi
    }
    if(language){
        params['country'] = country
    }
    if(topic){
        params['topic'] = topic
    }
    httpGet(params,'/search/tweets',appendSearchData);
});

$('#search-field').keypress(function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        $('#search-query').click();
    }
    
});

function appendSearchData(data){
    $('#tweet-card-body').html('');
    let tweets = data.data.docs; 
    let tweetsNum = tweets.length;
    var tweet = "<h3>Tweets Search Results</h3>"
    for(var i =0;i<tweetsNum;i++){
        tweet+= "<p><b>Tweet ID</b>:"+tweets[i].id+"</p>\
        <p><b>Username:</b>"+tweets[i]["user.name"][0]+"</p>\
        <p><b>User ID:</b>"+tweets[i]["user.id"][0]+"</p>\
        <p><b>Tweet text:</b>"+tweets[i].full_text[0]+"</p>\
        <p><b>country:</b>"+tweets[i].country[0]+"</p>\
        <p><b>Tweet date:</b>"+tweets[i].tweet_date.toString()+"</p>\
        <p><b>Tweet Language:</b>"+tweets[i].tweet_lang[0]+"</p>\
        <hr class='solid'>\
       "
    }
    $('#tweet-card-body').append(tweet);
    console.log(data);
}
