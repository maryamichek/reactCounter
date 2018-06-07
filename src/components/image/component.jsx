import React from 'react';
import './styles.less';

export default class ImageComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="imageContainer">
                <img src={this.props.src} alt=""/>
            </div>
        )
    }
}