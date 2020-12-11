$( document ).ready(function() {
  let params = {};
  $("#sen-country-button").text('USA');
    $("#sen-country-button").val('usa');
    $("#tot-country-button").text('USA');
    $("#tot-country-button").val('usa');
    $("#topic-country-button").text('USA');
    $("#topic-country-button").val('usa');
  params['country'] = 'usa';
  httpGet(params,'get/poi/sentiment',getPOIGraphs);
  httpGet(params,'get/country/sentiment',pieChart);
  httpGet(params,'get/covid/tweets',lineChart);
  getBargraph();
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

function lineChart(data){
  var canvas2 = document.getElementById("line-bar");
  var ctx2 = canvas2.getContext('2d');
  var dataa = {
    labels: data.labels,
    datasets: [{
        label: "covid tweets",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "red", // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "brown",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data: data['covid_t'],
        spanGaps: true,
      }, {
        label: "Non covid tweets",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "rgb(167, 105, 0)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "white",
        pointBackgroundColor: "black",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "brown",
        pointHoverBorderColor: "yellow",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: false
        data: data['non_cov'],
        spanGaps: false,
      }
  
    ]
  };
  
  // Notice the scaleLabel at the same level as Ticks
  var optionsa = {
    scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  },
                  scaleLabel: {
                       display: true,
                       labelString: 'No of tweets',
                       fontSize: 20 
                    }
              }]            
          }  
  };
  
  // Chart declaration:
  var myBarChart = new Chart(ctx2, {
    type: 'line',
    data: dataa,
    options: optionsa
  });

}

function getBargraph(){
  new Chart(document.getElementById("language-bar"), {
  type: 'bar',
  data: {
    labels:['English','Hindi','Italian'],
    datasets: [{
      backgroundColor: "blue",
      data: [57162, 21212, 31684],
      label:"Number of Tweets"
  }]
  },
  options: {
    title: {
      display: true,
      text: 'No of tweets per language'
    }
  }
});
}