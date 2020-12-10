$( document ).ready(function() {
  let params = {};
  $("#sen-country-button").text('USA');
    $("#sen-country-button").val('usa');
    $("#tot-country-button").text('USA');
    $("#tot-country-button").val('usa');
  params['country'] = 'usa';
  httpGet(params,'get/poi/sentiment',getPOIGraphs);
  httpGet(params,'get/country/sentiment',pieChart);
});

function pieChart(data){
  $('#total_tweets').text(data['total']);
  $('#pos_tweets').text(data.data[0]);
  $('#neg_tweets').text(data.data[2]);
  $('#neu_tweets').text(data.data[1]);
  var canvas1 = document.getElementById("sentiment-us");
  var ctx1 = canvas1.getContext('2d');
  var data_s_us = {
      labels: ["Positive", "Neutral","Negative"],
        datasets: [
          {
              fill: true,
              backgroundColor: [
                  'green',
                  'blue',
                'red'],
              data: data.data,
  // Notice the borderColor 
              borderColor:	['black', 'black'],
              borderWidth: [2,2]
          }
      ]
    };

// Notice the rotation from the documentation.

  var options_s_us = {
    title: {
      display: true,
      text: 'General tweet sentiment of people of towards government',
      position: 'top'
  },
          rotation: -0.7 * Math.PI
  };


  // Chart declaration:
  var myBarChart = new Chart(ctx1, {
      type: 'pie',
      data: data_s_us,
      options: options_s_us
  });
}



function getPOIGraphs(data){
  let dataLabels = data.labels;
  let positive = data.pos;
  let negative = data.neg;
  let neutral = data.neu;
  new Chart(document.getElementById("sentiment-bar"), {
  type: 'bar',
  data: {
    labels: dataLabels,
    datasets: [
      {
        label: "Positive",
        backgroundColor: "green",
        data: positive
      }, {
        label: "Neutral",
        backgroundColor: "blue",
        data: neutral
      },
      {
        label: "Negative",
        backgroundColor: "red",
        data: negative
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Tweet sentiment of POI'
    }
  }
});
}