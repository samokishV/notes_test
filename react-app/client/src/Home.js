import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import moment from 'moment';

import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
    en:{
        IndexPageHeader: "Notes listing",
        DelBtnText: "Delete",
        EditBtnText: "Edit",
        ChangeLng: "Change Language:",
        CreateBtnText: "Create new note"
    },
    ru: {
        IndexPageHeader: "Список записей",
        DelBtnText: "Удалить",
        EditBtnText: "Редактировать",
        ChangeLng: "Изменить язык:",
        CreateBtnText: "Cоздать новую запись"
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            language: 'en'
        };

        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
    }

    handleLanguageChange(e) {
        e.preventDefault();
        let lang = e.target.value;
        this.setState(prevState => ({
            language: lang
        }))
    }

    handleDeleteRow(i) {
        const note  = this.state.items[i];
        const noteId = note.id;
        const requestOptions = {
            method: 'DELETE'
        };

        fetch(`${process.env.REACT_APP_API_BASE_URL}/notes/` + noteId, requestOptions).then((res) => {
            return res.json();
        }).then((result) => {
            console.log(result);
            if(result.success) {
                let items = [...this.state.items];
                items.splice(i, 1);
                this.setState({
                    items: items
                });
            }
        });
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/notes`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        strings.setLanguage(this.state.language);
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h3 className="text-center m-3">{strings.IndexPageHeader}</h3>
                    <div className="row">
                        <div className="col-6">
                            <span className="m-4">{strings.ChangeLng}</span>
                            <select onChange={this.handleLanguageChange}>
                                <option value="en">English</option>
                                <option value="ru">Russian</option>
                            </select>
                        </div>
                        <div className="col-6 text-right">
                            <Link to="/create">
                                <button type="button" className="btn btn-success mr-5 mb-3">{strings.CreateBtnText}</button>
                            </Link>
                        </div>
                    </div>

                    <table className="table table-striped" id="chats">
                        <thead>
                        <tr>
                            <td className="text-center">id</td>
                            <td>text</td>
                            <td>created_at</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, i) => (
                            <tr key={i}>
                                <td className="text-center">{item.id}</td>
                                <td>
                                    <Link to={`/${item.id}`}>{item.text}</Link>
                                </td>
                                <td>{moment(item.created_at).format('YYYY-MM-gg HH:mm:ss')}</td>
                                <td>
                                    <Link to={`/edit/${item.id}`}>
                                        <button type="button" className="btn btn-success mr-2">{strings.EditBtnText}</button>
                                    </Link>
                                    <button type="button" onClick={() => this.handleDeleteRow(i)}
                                            className="btn btn-danger">{strings.DelBtnText}</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Home;
