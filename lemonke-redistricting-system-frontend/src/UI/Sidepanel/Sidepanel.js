import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core'
import classes from './Sidepanel.module.css';
import Plot from 'react-plotly.js';

function Sidepanel(props) {
	const [selectedTab, setSelectedTab] = useState(0)


	function TabPanel(props) {
		const { index, value, children } = props;
		return (
			<>
				{
					value === index && (
						<h1>{children}</h1>
					)
				}
			</>
		)
	}
	var xData = ['x1', 'x2',
	'x3', 'x4',];


	function getrandom(num , mul) {
		var value = [ ];
			for ( i = 0; i <= num; i++ ) {
				var rand = Math.random() * mul;
				value.push(rand);
			}
		return value;
	}

	var yData = [
		getrandom(30 ,10),
		getrandom(30, 20),
		getrandom(30, 25),
		getrandom(30, 40),
	];

	var colors = ['rgba(93, 164, 214, 0.5)', 'rgba(255, 144, 14, 0.5)', 'rgba(44, 160, 101, 0.5)', 'rgba(255, 65, 54, 0.5)'];

	var data = [];

	for ( var i = 0; i < xData.length; i ++ ) {
		var result = {
			type: 'box',
			y: yData[i],
			name: xData[i],
			boxpoints: 'all',
			jitter: 0.5,
			whiskerwidth: 0.2,
			fillcolor: colors[i],
			marker: {
				size: 2
			},
			line: {
				width: 1
			}
		};
	data.push(result);
	};

	var layout = {
		title: 'title goes here',
		yaxis: {
			autorange: true,
			showgrid: true,
			zeroline: true,
			dtick: 5,
			gridcolor: 'rgb(255, 255, 255)',
			gridwidth: 1,
			zerolinecolor: 'rgb(255, 255, 255)',
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

	var data1 = [
		{
			y: [0, 1, 1, 2, 3, 5, 8, 13, 21],
			boxpoints: 'all',
			jitter: 0.3,
			pointpos: -1.8,
			type: 'box'
		},
		{
			x: ['trace 0'],
			y: [18],
			name: 'special marker',
			text: 'special marker it is',
			marker: {
			size: 20
			}
		}
	];

	var marker = {x: ['x1'],
				y: [3],
				name: 'special point',
				text: 'this is special point',
				marker: {
					size: 3
				}
	}
	data.push(marker);



	return (
		<div className={classes.sidepanel}>
			<Tabs onChange={(e, val) => setSelectedTab(val)} >

				<Tab className={classes.tabs} style={{ minWidth: '33%' }} label="1" />
				<Tab className={classes.tabs} style={{ minWidth: '33%' }} label="2" />
				<Tab className={classes.tabs} style={{ minWidth: '33%' }} label="3" />
			</Tabs>
			<TabPanel value={selectedTab} index={0}>Item 1
				<Plot data={data1} layout= {{width: 300, height: 300, title: 'title goes here'}}></Plot>
				<Plot data={data} layout= {layout}></Plot>
				<Plot data={data1} layout= {{width: 300, height: 300, title: 'another title goes here'}}></Plot>
			</TabPanel>
			<TabPanel value={selectedTab} index={1}>Item 2
			</TabPanel>
			<TabPanel value={selectedTab} index={2}>Item 3</TabPanel>
		</div>
	)
}

export default Sidepanel;