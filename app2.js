// dimensions for the SVG container
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// chart area minus margins
 var width = svgWidth - margin.left - margin.right;
 var height = svgHeight - margin.top - margin.bottom;

// create svg container
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  // Import Data
d3.csv("data.csv").then(function(data) {

    // Step 1: Parse Data/Cast as numbers

    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
   
});

// Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(data, d => d.chosenXAxis)]) 
    .range([0, width]);
    

     
      var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.chosenYAxis)])
      .range([height, 0]);
     
       // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

      
    chartGroup.append("g")
    .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.chosenXAxis))
    .attr("cy", d => yLinearScale(d.chosenYAxis))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".7");

      // Step 6: Initialize tool tip
    // ==============================
      var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([90, -60])
        .html(function(d) {
            return(`${d.state}<br>Xlabel: ${d.chosenXAxis}<br>Ylabel: ${d.chosenYAxis}%`);
});
            
            chartGroup.call(toolTip);

//event listeners
    // ==============================
    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
    })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Without Healthcare");

      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });
