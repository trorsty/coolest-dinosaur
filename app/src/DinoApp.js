import React, {Component } from 'react';
import { Button, Icon, Transition } from 'semantic-ui-react';
import DinoSketch from './DinoSketch.js'
import DinoAnalysis from './DinoAnalysis.js'

import './DinoApp.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			started: false,
			finished: false,
		}
	}

	render() {
		return (
		<div className="Page">
			<div className="App">

				{this.state.started ? null : 
					<div className="ui raised very padded text container segment">		
						<div className="header">Ready to draw the coolest dinosaur?</div> 
						{this.renderDinoStartButton()}
					</div>
				}

				{this.state.finished ? 
					<div> {this.renderDinoAnalysis()}</div> :
					<div> {this.renderDinoSketchPad()} </div>
				}

			</div>
		</div>
		);
	}

	renderDinoStartButton() {
		return <div>
			<Button
				animated
				color='violet'
				onClick={() => this.setState({started: true})}
			>
				<Button.Content visible>Begin</Button.Content>
				<Button.Content hidden>
					<Icon name='right arrow' />
				</Button.Content>
			</Button>
		</div>
	}

	renderDinoSketchPad () {
		return <Transition animation='slide down' duration={1000} visible={this.state.started}>
			<DinoSketch onSubmit={this.analyseDinoSketch}/>
		</Transition>
	}

	renderDinoAnalysis () {
		return <Transition animation='slide down' duration={1000} visible={this.state.finished}>
			<DinoAnalysis sketchJson={this.state.sketchJson} 
				sketchImg={this.state.sketchImg}
				onReset={this.reset}
			/>
		</Transition>
	}

	reset = () => {
		this.setState({
			started: true,
			finished: false
		})
	}

	analyseDinoSketch = (sketchJson, sketchImg) => {
		this.setState({
			finished: true,
			sketchJson: sketchJson,
			sketchImg: sketchImg
		})
	}

}

export default App;
