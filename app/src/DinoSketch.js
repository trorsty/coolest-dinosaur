import {SketchField, Tools} from 'react-sketch';
import React, {Component } from 'react';
import { Button, Icon, Transition } from 'semantic-ui-react';

import {CompactPicker} from 'react-color';

export default class DinoSketch extends Component {
    
    constructor(props) {
		super(props);
		this.state = {
            lineColour: 'black',
            canUndo: false,
            canRedo: false
		}
    }

    render() {
        return (
            <div>
                <div className="instructions">
                    Draw your dinosaur in this box! Once you're done, click the button and we'll tell you how cool your dinosaur is.
                </div> 
                <div className="ui raised very padded text container segment" style={{padding: 0}}>
                    <SketchField width='700px' 
                        height='400px'
                        ref={(c) => this._sketch = c}
                        tool={Tools.Pencil} 
                        lineColor={this.state.lineColour}
                        lineWidth={3}
                        onChange={this.onDrawingChange}
                    />
                </div>
                    {this.renderUndoRedo()}
                    {this.renderColourPicker()}
                    {this.renderSubmitButton()}
            </div>
        )
    }
    
    undo = () => {
        this._sketch.undo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo()
        })
    };

    redo = () => {
        this._sketch.redo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo()
        })
    };

    submit = () => {
        this.props.onSubmit(this._sketch.toJSON(), this._sketch.toDataURL())
    }

    onDrawingChange = () => {
        let previous = this.state.canUndo;
        let now = this._sketch.canUndo();
        if (previous !== now) {
            this.setState({canUndo: now});
        }
    };

    renderSubmitButton() {
		return <Transition animation='slide up' duration={250}>
			<div className="submit-button">
				<Button animated
					color='green'
					onClick={() => this.submit()}
                >
					<Button.Content visible>I'm done!</Button.Content>
					<Button.Content hidden>
						<Icon name='check' />
					</Button.Content>
				</Button>
			</div>
		</Transition>
	}
    
    renderColourPicker () {
        return (
            <div className="colour-picker">
                <CompactPicker
                    color={this.state.lineColour}
                    onChange={(colour) => this.setState({lineColour: colour.hex})}
                />
            </div>
        )
    }

    renderUndoRedo () {
        return (
            <span>
                <Button icon onClick={ () => this.undo()} disabled={!this.state.canUndo}>
                    <Icon name='arrow left'/>
                </Button>
                <Button icon onClick={ () => this.redo()} disabled={!this.state.canRedo}>
                    <Icon name='arrow right'/>
                </Button>
            </span>
        )
    }
    
}