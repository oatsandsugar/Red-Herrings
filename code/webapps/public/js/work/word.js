wordlist=function(id,dataC,dataL,dataI){
	var width=$(id).width();
	var height=$(id).width()*(1+(Object.keys(dataC).length+Object.keys(dataL).length+Object.keys(dataI).length)*0.02);
d3.select(id).select("svg").remove();
 var svg = d3.select(id).append("svg")
    .attr("width", width*0.9)
    .attr("height", height*0.9)

// add the tooltip area to the webpage
var tooltip = d3.select(id).append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
 var count=1;

var maxVal={}
var minVal={}
var allVal={}

for(val in dataC){
	var max=d3.max(dataC[val])
	var min=d3.min(dataC[val])
	maxVal[val]=max;
	minVal[val]=min;

	for(var i=0;i<dataC[val].length;i++){
		if(val in allVal){
			allVal[val].push(dataC[val][i])
		}else{
			allVal[val]=[dataC[val][i]]
		}
	}
}
for(val in dataL){
	var max=d3.max(dataL[val])
	var min=d3.min(dataL[val])
	if(val in maxVal){
	maxVal[val]=Math.max(max,maxVal[val]);
	minVal[val]=Math.min(min,minVal[val]);
}else{
	maxVal[val]=max;
	minVal[val]=min;
}

for(var i=0;i<dataL[val].length;i++){
	if(val in allVal){
			allVal[val].push(dataL[val][i])
		}else{
			allVal[val]=[dataL[val][i]]
		}
	}
	
}

var averageVal={}
var sd={}
for (val in allVal){
	averageVal[val]=average(allVal[val])
	sd[val]=standardDeviation(allVal[val])
}

var overlap={}
for(val in dataI){
	var max=d3.max(dataI[val])
	var min=d3.min(dataI[val])
	if(val in maxVal){
	maxVal[val]=Math.max(max,maxVal[val]);
	minVal[val]=Math.min(min,minVal[val]);
	}else{
		maxVal[val]=max;
		minVal[val]=min;
	}

	for(var i=0;i<dataC[val].length;i++){
		if(val in allVal){
			allVal[val].push(dataI[val][i])
		}else{
			allVal[val]=[dataI[val][i]]
		}
	}
}
 for(val in dataC){
 	var tmpData=[]
 	for(var i=0;i<dataC[val].length;i++){
 		tmpData.push({val:dataC[val][i]})
 	}

 	var xMap = function(d) { return x(d.val);}

    var x=d3.scale.linear()
    .domain([minVal[val],maxVal[val]])
    .range([0,width*0.55]);
    
    

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0)
    .ticks(0)

    var g=svg.append("g")
    .attr("transform", "translate(" + width*0.05 + "," + width*0.03*count + ")")
    .append("g")
    .attr("class", "x axis")
    .call(xAxis); 
    count=count+1;
    if (!(val in dataL) || (average(dataC[val])>(averageVal[val]+2*sd[val]))|| (average(dataC[val])<(averageVal[val]-2*sd[val]))){
     overlap[val]=0
     g.append("text")
    .attr('class','fontImportant')
    .attr("text-anchor", "start")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ width*0.56 +","+0+")")  // text is drawn off the screen top left, move down and out and rotate
    .text(val);   	
    }else{
    g.append("text")
    .attr('class','fontNormal')
    .attr("text-anchor", "start")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ width*0.56 +","+0+")")  // text is drawn off the screen top left, move down and out and rotate
    .text(val); 	
    }


    g.selectAll(".CompliantDots")
      .data(tmpData)
    .enter().append("circle")
      .attr("class", "CompliantDots")
      .style('fill-opacity',1)
      .attr("r", 5)
      .attr("cx", xMap)
      .attr("cy", 0)
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);

          tooltip.html(  d.val )
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 60) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
	}
count=count+1;
 for(val in dataL){
 	
 	var tmpData=[]
 	for(var i=0;i<dataL[val].length;i++){
 		tmpData.push({val:dataL[val][i]})
 	}

 	var xMap = function(d) { return x(d.val);}

    var x=d3.scale.linear()
    .domain([minVal[val],maxVal[val]])
    .range([0,width*0.55]);
    
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(0)
    .tickSize(0,0);

    var g=svg.append("g")
    .attr("transform", "translate(" + width*0.05 + "," + width*0.03*count + ")")
    .append("g")
    .attr("class", "x axis")
    .call(xAxis); 
    count=count+1;
    g.append("text")
    .attr("text-anchor", "start")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ width*0.56 +","+0+")")  // text is drawn off the screen top left, move down and out and rotate
    .text(val);

    g.selectAll(".LegalDots")
      .data(tmpData)
    .enter().append("circle")
      .attr("class", "LegalDots")
      .style('fill-opacity',1)
      .attr("r", 5)
      .attr("cx", xMap)
      .attr("cy", 0)
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);

          tooltip.html(  d.val )
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 60) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

	}
count=count+1;
 for(val in dataI){
 	
 	var tmpData=[]
 	for(var i=0;i<dataI[val].length;i++){
 		tmpData.push({val:dataI[val][i]})
 	}

 	var xMap = function(d) { return x(d.val);}

    var x=d3.scale.linear()
    .domain([minVal[val],maxVal[val]])
    .range([0,width*0.55]);
    
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(0)
    .tickSize(0,0);

    var g=svg.append("g")
    .attr("transform", "translate(" + width*0.05 + "," + width*0.03*count + ")")
    .append("g")
    .attr("class", "x axis")
    .call(xAxis); 
    count=count+1;
    if (!(val in dataL) || (average(dataI[val])>(averageVal[val]+2*sd[val]))|| (average(dataI[val])<(averageVal[val]-2*sd[val]))){
     var classNum='fontImportant';
     if (val in overlap){
     	classNum='fontOverlap'
     }
     g.append("text")
    .attr('class',classNum)
    .attr("text-anchor", "start")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ width*0.56 +","+0+")")  // text is drawn off the screen top left, move down and out and rotate
    .text(val);   	
    }else{
    g.append("text")
    .attr('class','fontNormal')
    .attr("text-anchor", "start")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ width*0.56 +","+0+")")  // text is drawn off the screen top left, move down and out and rotate
    .text(val); 	
    }

    g.selectAll(".InspectionDots")
      .data(tmpData)
    .enter().append("circle")
      .attr("class", "InspectionDots")
      .style('fill-opacity',1)
      .attr("r", 5)
      .attr("cx", xMap)
      .attr("cy", 0)
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);

          tooltip.html(  d.val )
               .style("left", (d3.event.pageX +5) + "px")
               .style("top", (d3.event.pageY - 60) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

	}
	
function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}




}