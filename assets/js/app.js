
// dimensions for the SVG container

var svgHeight = 600;
var svgWidth = 400;

// margins
var margin = { top: 50, 
    right: 50, 
    bottom: 50, 
    left: 50
 };

 // chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select(".chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .append("g")
    .attr("transform", "translate(" + margin.left +", "+ margin.top +")");

    // shift margins
var chartGroup = svg.append("g")
 
// create tooltips 
d3.select(".chart")
.append("div")
.attr("class", "tooltip")
.style("opacity", 0);

// Import Data
d3.csv("Data.csv", function(err, Data) {
    data.poverty = +data.poverty;
    data.healthcare = +Data.healthcare;
});

 //make scales
    var yLinearScale = d3.scaleLinear()
.range([height, 0]);

var xLinearScale = d3.scaleLinear()
.range([width, 0]);

//  axis
 var bottomAxis =  d3.axisBottom(xlinearScale);
 var leftAxis =  d3.left(ylinearScale);
     
   // scale
   xLinearScale.domain([10, d3.max(Data, function(data) {
       return +data.poverty;
   })]);

   yLinearScale.domain([0, d3.max (Data, function(data) {
       return +data.healthcare * 1.0;

   })]);
var toolTip = d3.tip()
.attr("class", "tooltip")
.offset([70, -60])
.html(function(data) {
    var abbrName = data.abbr;
    var povertyRate = +data.poverty;
    var noHealthcare = +data.healthcare;
    return (abbrName = "<br> Poverty Rate: "+ povertyRate + "<br> No Healthcare: "+ noHealthcare);
});
 chart.call(toolTip);

 var element = chart.append("g").selectAll("g")
 .data(Data)

 var elementEnter = element.enter()
 .append("g")
 .attr("transform", function (data, index) {
     return "translate"(" +xLinearScale(data.poverty) +", " + yLinearScale(data.healthcare) +")
     
 });
  
 elementEnter.append("circle")
 .attr("r", "15")
 .attr("fill",  "Red")
 .on("click", function(data) {
     toolTip.show(data);
})

// on mouse
.on("mouseout",  function(data, index) {
    toolTip.hide(data);
});

elementEnter.append("text")
.attr("dy", function(data, index){return 6;})
.attr("text-anchor", "middle")
.text(function(data, index){return data.abbr;})
.attr("font-size", 14)
.attr('fill', 'white');

chart.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chart.append("g")
.call(leftAxis);

chart.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 -margin.left+ 50)
.attr("x", 0 -(height/2)- 50)
.attr("dy", "1.5em")
.attr("class", "axisText")
.text("No Healthcare(%)");


// x axis label
chart.append("text")
.attr("transform", "translate(" + (width/ 5 - 20) + "," +(height + margin.top + 50) +")")
.attr("class", "axisText")
.text("Poverty Rate (%)");
