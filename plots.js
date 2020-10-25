// function buildPlot(shark) {
//     d3.json("sharks.json").then((data) => {
//         console.log(data);
//         for (var i = 0; i < data.length; i++) {
//             yearAttacks.push(data[i].year),
//             typeAttacks.push(data[i].type),
//                 // areaAttacks.push(sharkAttacks[i].Area),
//             locationAttacks.push(data[i].Location)
//         }
//         });
//       }

//   buildPlot();

function buildPlot() {
    d3.json('sharks.json').then(function(data) {

        // Grab values from the data json object to build the plots
        var year = data.year;
        var type = data.type;
        var country = data.country;
        var species = data.species;
        var area = data.area;
        var fatal = data.fatal;

        console.log(fatal);

        var trace1 = {
            type: 'scatter',
            mode: 'lines',
            country: country,
            x: year,
            y: fatal,
            line: {
                color: "#17BECF"
              }
        };
        var data = [trace1];

        var layout = {
            title: `fatal attacks by country`,
            xaxis: {
              range: [0, 10000],
              type: "integer"
            },
            yaxis: {
              autorange: true,
              type: "linear"
            }
          };

          Plotly.newPlot("plot", data, layout);
    }
    )};

    buildPlot();
