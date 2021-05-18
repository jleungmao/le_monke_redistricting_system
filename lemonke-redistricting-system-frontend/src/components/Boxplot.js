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

        var data = [];


        async function fetchData() {
            let res1 = await axios(`http://localhost:8080/lemonke/box-whisker/${[46, 47, 49]}/${'WHITE'}/background`);
            let res2 = await axios(`http://localhost:8080/lemonke/box-whisker/${45}/${'WHITE'}/dots`);
            
            var yData = res1.data
            let yDot = res2.data
            
            var xData = [];
            for (var i = 1; i <= yData.length; i++)
            {
                xData.push("District "+i)
            }

            console.log(yData)
            for (var i = 0; i < xData.length; i++) {
                let yd = yData[i]
                for(var j = 0; j < yData[i].length; j++)
                {
                    yd[j] = yd[j]*100
                }
                var result = {
                    type: 'box',
                    y: yd,
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
            //setDotData(res2.data);

            for (var i = 0; i < xData.length; i++) {
                var yd = yDot[i]*100
                console.log(yd);
                console.log(xData[i]);
                var result = {
                    x: [xData[i-1]],
                    y: [yd],
                    name: 'Selected Districting',
                    marker: {
                        size: 5,
                        color: 'rgb(0,0,0)'
                    }
                };
                data.push(result);
            };

            setBoxPlotSet(data)
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

        return () => { }
    }, [])

    return (
        <div>
            <Plot data={boxPlotSet} layout={layout}></Plot>
        </div>
    )
}

export default Boxplot;