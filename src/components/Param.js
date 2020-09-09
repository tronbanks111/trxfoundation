import React, { Component } from 'react'
import Top from "./TopPage2";

class Param extends Component {
    render() {
        //  console.log(this.props.match.params.id);
        return (
            <div>
                <Top
                    refLinkid={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default Param
