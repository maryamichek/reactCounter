import React from 'react';

import ImageComponent from '../image/component.jsx';

export default class CounterComponent extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            counter: 0,
            disabled: true,
            images: [{
            }]
        }
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
    }

    onIncrement() {
        let self = this;
        let counter = this.state.counter + 1;
        fetch("http://37.139.21.46/images/" + counter + ".png").then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error("Network response was not OK!");
            }
        }).then(imageObject => {
            let objectURL = URL.createObjectURL(imageObject);
            let newImage = {src: objectURL};

            let arr = self.state.images;
            arr.push(newImage);

            let newStates = {
                counter: self.state.counter + 1,
                images: arr
            };

            if (self.state.counter == 0) {
                newStates.disabled = false;
            }

            self.setState(newStates);
        }).catch(error => {
            console.log("There has been a problem with fetch operation " + error.message);
        })
    }

    onDecrement() {
        if (this.state.counter > 0) {

            let arr = this.state.images;
            arr.pop();

            let newStates = {
                counter: this.state.counter - 1,
                images: arr
            };

            if (this.state.counter == 1) {
                newStates.disabled = true;
            }

            this.setState(newStates);
        }
    }

    render() {
        let images = this.state.images.map((image, index) => <ImageComponent key={index} {...image}/>);
        return(
            <div className="container">
                <div className="page-header">
                    <h1>React App</h1>
                </div>
                <div className="row">
                    <div className="jumbotron col-lg-4 col-md-6 col-xs-6 col-lg-offset-4 col-md-offset-3 col-xs-offset-3">
                        <h2 className="text-center">
                            {this.state.counter}
                        </h2>
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-xs-10 btn-group btn-group-justified" role="group">
                                <div className="btn-group" role="group">
                                    <button
                                        className="btn btn-success glyphicon glyphicon-minus"
                                        onClick={this.onDecrement}
                                        disabled={this.state.disabled}>
                                    </button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button
                                        className="btn btn-success glyphicon glyphicon-plus"
                                        onClick={this.onIncrement}>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">{images}</div>
            </div>
        );
    }
}