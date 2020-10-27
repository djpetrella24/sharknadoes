var sharkData = [];

d3.json("/data").then(function (data) {
    sharkData = data;
    console.log(sharkData);

    // Save the element, value, and id of the filter that was changed
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");
    var tbody = d3.select("tbody");
    // console.log(dataset);
    //  var filterId = changedElement.attr("id");
    let filteredData = sharkData;
    var sharkData = data;
    Object.entries(sharkData).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === dataset);
    });
    // Finally, rebuild the table using the filtered Data
    buildTable(filteredData);

    function buildTable(data) {

        // First, clear out any existing data
        tbody.html("");

        // Next, loop through each object in the data
        // and append a row and cells for each value in the row
        data.forEach((sharkData) => {
            // Append a row to the table body
            var row = tbody.append("tr");

            // Loop through each field in the dataRow and add
            // each value as a table cell (td)
            Object.values(sharkData).forEach((val) => {
                var cell = row.append("td");
                cell.text(val);
            });
        });
    }
  // Finally, rebuild the table using the filtered Data
  buildTable(sharkData);

});

// Build the table when the page loads
buildTable(sharkData);