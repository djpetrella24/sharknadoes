var sharkData = [];

d3.json("/data").then(function (data) {
    sharkData = data;
    console.log(sharkData);
})

// Function called by DOM changes
function getData() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    // Read in sharkdata
    var sharkData = d3.json("./data").then(function (sharkData) {
        var sharkAttacks = sharkData;

        // Return function based on user's input
        var attacks2020_usa = [];
        var attacks2019_usa = [];
        var attacks2018_usa = [];

        var attacks2020_aus = [];
        var attacks2019_aus = [];
        var attacks2018_aus = [];

        var attacks2020_nz = [];
        var attacks2019_nz = [];
        var attacks2018_nz = [];


        // Initialize x and y arrays
        var x = [];
        var y = [];


        if (dataset == 'USA') {
            for (var i = 0; i < sharkAttacks.length; i++) {
                if (sharkAttacks[i].country == 'USA') {
                    // Push number of attacks for this year into an array
                    if (sharkAttacks[i].year == '2020') {
                        attacks2020_usa.push(sharkAttacks[i].year);
                    }
                    else if (sharkAttacks[i].year == '2019') {
                        attacks2019_usa.push(sharkAttacks[i].year);
                    }
                    else attacks2018_usa.push(sharkAttacks[i].year);
                };
            }

            var numberAttacks_2020_usa = attacks2020_usa.length;
            var numberAttacks_2019_usa = attacks2019_usa.length;
            var numberAttacks_2018_usa = attacks2018_usa.length;


            // console.log(numberAttacks_2020_usa);
            // console.log(numberAttacks_2019_usa);
            // console.log(numberAttacks_2018_usa);


        }

        // console.log(numberAttacks_2020_usa);
        // console.log(numberAttacks_2019_usa);
        // console.log(numberAttacks_2018_usa);


        var trace1 = {
            x: ["2020", "2019", "2018"],
            y: [numberAttacks_2020_usa, numberAttacks_2019_usa, numberAttacks_2018_usa],
            type: "bar"

        };

        var data = [trace1];

        var layout = {
            title: "Number of Shark Attacks in United States by Year"
        };

        Plotly.newPlot("bar", data, layout);

        if (dataset == 'AUSTRALIA') {
            for (var i = 0; i < sharkAttacks.length; i++) {
                if (sharkAttacks[i].country == "AUSTRALIA") {
                    // Push number of attacks for this year into an array
                    if (sharkAttacks[i].year == '2020') {
                        attacks2020_aus.push(sharkAttacks[i].year);
                    }
                    else if (sharkAttacks[i].Year == '2019') {
                        attacks2019_aus.push(sharkAttacks[i].year);
                    }
                    else attacks2018_aus.push(sharkAttacks[i].year);
                };
            }

            var numberAttacks_2020_aus = attacks2020_aus.length;
            var numberAttacks_2019_aus = attacks2019_aus.length;
            var numberAttacks_2018_aus = attacks2018_aus.length;

            console.log(numberAttacks_2020_aus);
            console.log(numberAttacks_2019_aus);
            console.log(numberAttacks_2018_aus);

            var trace1 = {
                x: ["2020", "2019", "2018"],
                y: [numberAttacks_2020_aus, numberAttacks_2019_aus, numberAttacks_2018_aus],
                type: "bar"

            };

            var data = [trace1];

            var layout = {
                title: "Number of Shark Attacks in Australia by Year"
            };

            Plotly.newPlot("bar", data, layout);

        }

        if (dataset == 'NEW ZEALAND') {
            for (var i = 0; i < sharkAttacks.length; i++) {
                if (sharkAttacks[i].country == "NEW ZEALAND") {
                    // Push number of attacks for this year into an array
                    if (sharkAttacks[i].year == '2020') {
                        attacks2020_nz.push(sharkAttacks[i].year);
                    }
                    else if (sharkAttacks[i].Year == '2019') {
                        attacks2019_nz.push(sharkAttacks[i].year);
                    }
                    else attacks2018_nz.push(sharkAttacks[i].year);
                };
            }

            var numberAttacks_2020_nz = attacks2020_nz.length;
            var numberAttacks_2019_nz = attacks2019_nz.length;
            var numberAttacks_2018_nz = attacks2018_nz.length;

            console.log(numberAttacks_2020_nz);
            console.log(numberAttacks_2019_nz);
            console.log(numberAttacks_2018_nz);

            var trace1 = {
                x: ["2020", "2019", "2018"],
                y: [numberAttacks_2020_nz, numberAttacks_2019_nz, numberAttacks_2018_nz],
                type: "bar"

            };

            var data = [trace1];

            var layout = {
                title: "Number of Shark Attacks in New Zealand by Year"
            };

            Plotly.newPlot("bar", data, layout);

        }
        // Build bar graph with data from functions

    });

}

