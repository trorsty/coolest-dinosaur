import React, {Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

const compliments = [
    'An unrivalled work, cromulent in scaley splendour.',
    'Thoroughly, urgently inspiring in this asteroid-threatened moment.',
    'The sublime beauty of the negative space endangers the simplicity of the lizard-protagonist.',
    'The disjunctive perturbation of the Triassic motifs resonates the larger carcass.',
    'An optical suggestion of the spatial relationships contextualises the later fossil.'
]

export default class DinoAnalysis extends Component {
    
    constructor(props) {
		super(props);
		this.state = {
            complexity: 0,
            colourChoice: 0,
            overall: 0
		}
    }

    componentDidMount = () => {
        var self = this
        var data = {
            sketchJson: this.props.sketchJson
        }
        fetch('/analysis', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(function (scores) {
            self.setState(
                {
                    'complexity': scores.complexity,
                    'colourChoice': scores.colour,
                    'overall': Math.round((scores.complexity + scores.colour))/2
                }
            )
        })
    }

    render() {
        return (
            <div>
                <div className="header">Beautiful!</div> 
                <div className="ui raised very padded text container segment" style={{padding: 0}}>
                    <img src={this.props.sketchImg} style={{width: '700px'}} alt="Where's the dinosaur?"/>
                </div>
                <div className="dino-review">
                    {compliments[Math.floor(Math.random() * 6)]}<br/><br/><br/>
                    <strong>Complexity: {this.state.complexity} / 10</strong> <br/><br/>
                    <strong>Colour Choice: {this.state.colourChoice} / 10</strong><br/><br/> 
                    <strong>Overall: {this.state.overall} / 10</strong><br/><br/> 
                </div>
                {this.renderAgainButton()}
            </div>
        )
    }

    renderAgainButton() {
		return <div>
			<Button
				animated
				color='violet'
				onClick={() => this.props.onReset()}>
				<Button.Content visible>Again!</Button.Content>
				<Button.Content hidden>
					<Icon name='undo'/>
				</Button.Content>
			</Button>
		</div>
	}

}