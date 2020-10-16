// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("attacks.csv").then(function (sharkData) {
    console.log(sharkData)
    var sharkAttacks = sharkData
    var dateAttacks = [];
    var yearAttacks = [];
    var areaAttacks = [];
    var locAttacks = [];

    for (var i = 0; i < sharkAttacks.length; i++) {
        if ((sharkAttacks[i].Country == 'USA') && (sharkAttacks[i].Year > 1900)) {
            yearAttacks.push(sharkAttacks[i].Year),
                dateAttacks.push(sharkAttacks[i].Date),
                locAttacks.push(sharkAttacks[i].Location)
            areaAttacks.push(sharkAttacks[i].Area);
        }
    }
    // console.log(yearAttacks);
    // console.log(dateAttacks);
    // console.log(areaAttacks);
    // console.log(locAttacks);
    var barSpacing = 10; // desired space between each bar
    var scaleY = 10; // 10x scale on rect height

    // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
    var barWidth = (chartWidth - (barSpacing * (sharkAttacks.length - 1))) / sharkAttacks.length;

        // @TODO
        // Create code to build the bar chart using the tvData.
        chartGroup.selectAll(".bar")
            .data(yearAttacks)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("width", d => barWidth)
            .attr("height", d => yearAttacks * scaleY)
            .attr("x", (d, i) => i * (barWidth + barSpacing))
            .attr("y", d => chartHeight - yearAttacks * scaleY);
    }).catch(function (error) {
        console.log(error);
    });
