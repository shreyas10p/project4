const baseUrl = $('#base-url').val();

function httpGet(params,serviceUrl,callback){
	getData(params, serviceUrl, callback);
}
 
function getData(params, serviceUrl, callback) {
 	$.ajax({
    contentType: 'application/json',
    data: params,
    dataType: 'json',
    success: function(data){
    	callback(data);
    },
    error: function(){
      console.log("error occured while fetching response");
    },
    type: 'GET',
    url: baseUrl+serviceUrl
  });
}