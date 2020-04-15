import React, {Component} from 'react';
import {Link} from "react-router-dom";

import LocalizedStrings from "react-localization";
import {withRouter} from "react-router";

let strings = new LocalizedStrings({
    en:{
        EditPageHeader: "Edit note",
        SaveBtnText: "Save",
        ChangeLng: "Change Language:",
        Back: "Back to home"
    },
    ru: {
        EditPageHeader: "Отредактировать запись",
        SaveBtnText: "Сохранить",
        ChangeLng: "Изменить язык:",
        Back: "На главную"
    }
});

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', apiResponse: "", language: 'en'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    callAPI(noteId) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/notes/${noteId}`)
            .then(res => res.json())
            .then(result => this.setState({ apiResponse: result, value: result.text }));
    }

    componentWillMount() {
        const id = this.props.match.params.noteId;
        this.callAPI(id);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const text = this.state.value.trim();

        if(text) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/notes/${this.state.apiResponse.id}`, {
                method: 'PUT',
                body: JSON.stringify({text: text}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(result => {
                    if(result.success) {
                        window.location.href = "/";
                    }
                })
                .catch(err => err);
        }
        event.preventDefault();
    }

    handleLanguageChange(e) {
        e.preventDefault();
        let lang = e.target.value;
        this.setState(prevState => ({
            language: lang
        }))
    }

    render() {
        strings.setLanguage(this.state.language);

        return (
            <div className="m-4">
                <h3 className="text-center m-3">{strings.EditPageHeader}</h3>

                <span className="m-4">{strings.ChangeLng}</span>
                <select onChange={this.handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="ru">Russian</option>
                </select>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <textarea value={this.state.value} onChange={this.handleChange} className="form-control m-4" id="text" rows="3" />
                    </div>
                    <button type="submit" className="btn btn-success ml-4 mb-3">
                        {strings.SaveBtnText}
                    </button>
                </form>

                <Link to="/"><span className="ml-4">{strings.Back}</span></Link>
            </div>
        );
    }
}

export default withRouter(EditNote);
