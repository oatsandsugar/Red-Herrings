barChart=function(id,data){
  
  var barChartData=[]
  for(var i=0;i<data.length;i++){
    if(!isNaN(data[i]['rating'])){
    barChartData.push({
      'label': data[i]['trade_nm'],
      'value': data[i]['rating']
    })
  }
  }
  $('#divBarChart').height($('#divBarChart').width()*(1+barChartData.length/60))
  var display=[{
    'key':"",
    'values':barChartData
          }]
  nv.addGraph(function() {
  var chart = nv.models.multiBarHorizontalChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value }) 
      .margin({top: 0, right: 0, bottom: 0, left: 150})  
      .tooltips(false)        //Don't show tooltips
      .showValues(true)       //...instead, show the bar value right on top of each bar.
      ;


  d3.select(id)
      .datum(display)
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});
}