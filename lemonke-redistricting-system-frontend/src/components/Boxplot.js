import axios from 'axios';
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Boxplot(props) {

    function getrandom(num, mul) {
        var value = [];
        for (let i = 0; i <= num; i++) {
            var rand = Math.random() * mul;
            value.push(rand);
        }
        return value;
    }

    var layout = {
        title: 'Minority Popularity Box and Whisker Plot (%)',
        yaxis: {
            autorange: true,
            showgrid: true,
            zeroline: true,
            dtick: 5,
            gridcolor: 'rgb(255, 255, 255)',
            gridwidth: 1,
            zerolinecolor: 'rgb(0, 0, 0)',
            zerolinewidth: 2
        },
        margin: {
            l: 40,
            r: 30,
            b: 80,
            t: 100
        },
        paper_bgcolor: 'rgb(255, 255, 255)',
        plot_bgcolor: 'rgb(243, 243, 243)',
        showlegend: false
    };

    const [boxPlotSet, setBoxPlotSet] = useState([]);
    // const [xData, setXData] = useState([])
    const [dotData, setDotData] = useState([])
    // const [yData, setYData] = useState([])

    useEffect(() => {

        var xData = ['District 1', 'District 2',
            'District 3', 'District 4', 'District 5',
            'District 6', 'District 7', 'District 8',

            'District 9', 'District 10', 'District 11',
            'District 12', 'District 13', 'District 14',
            'District 15', 'District 16', 'District 17',

            'District 18', 'District 19', 'District 20',
            'District 21', 'District 22', 'District 23',
            'District 24', 'District 25', 'District 26', 'District 27'
        ];

        var data = [];


        async function fetchData() {
            let res1 = await axios(`http://localhost:8080/lemonke/box-whisker/${[5, 6, 7]}/${'WHITE'}/background`);
            let yData = res1.data
            console.log(yData)
            for (var i = 0; i < xData.length; i++) {
                var result = {
                    type: 'box',
                    y: yData[i],
                    name: xData[i],
                    jitter: 0.5,
                    whiskerwidth: 0.2,
                    marker: {
                        size: 2
                    },
                    line: {
                        width: 1
                    }
                };
                data.push(result);
            };

            // setYData(res1.data);


            let res2 = await axios(`http://localhost:8080/lemonke/box-whisker/${6}/${'WHITE'}/dots`);
            console.log(res2.data)
            setDotData(res2.data);

        }

        fetchData();



        // for (var i = 0; i < xData.length; i++) {
        //     var result = {
        //         type: 'box',
        //         y: yData[i],
        //         name: xData[i],
        //         jitter: 0.5,
        //         whiskerwidth: 0.2,
        //         marker: {
        //             size: 2
        //         },
        //         line: {
        //             width: 1
        //         }
        //     };
        //     data.push(result);
        // };



        for (var i = 0; i < xData.length; i++) {
            var result = {
                x: ['District ' + (i + 1)],
                y: [Math.random() * i * 3],
                name: 'Selected Districting',
                marker: {
                    size: 5,
                    color: 'rgb(0,0,0)'
                }
            };
            data.push(result);
        };

        setBoxPlotSet(data)

        return () => { }
    }, [])



    return (
        <div>
            <Plot data={boxPlotSet} layout={layout}></Plot>
        </div>
    )
}

export default Boxplot;