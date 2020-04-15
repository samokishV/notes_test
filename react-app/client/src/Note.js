import React, {Component} from 'react';
import {Link} from "react-router-dom";

import { withRouter } from "react-router";

require('dotenv').config();

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI(noteId) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/notes/${noteId}`)
            .then(res => res.json())
            .then(result => this.setState({ apiResponse: result }));
    }

    componentWillMount() {
        const id = this.props.match.params.noteId;
        this.callAPI(id);
    }

    render() {
        return (
            <div className="m-4">
                <p>{this.state.apiResponse.text}</p>
                <Link to="/">Back to home</Link>
            </div>
        );
    }
}

export default withRouter(Note);
