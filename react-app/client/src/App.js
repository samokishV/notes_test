import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
    en:{
        IndexPageHeader: "Notes listing",
        DelBtnText: "Delete"
    },
    ru: {
        IndexPageHeader: "Список записей",
        DelBtnText: "Удалить",
    }
});

class App extends Component {
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

        let items = [...this.state.items];
        items.splice(i, 1);
        this.setState({
            items: items
        })
    }

    componentDidMount() {
        fetch("http://localhost:9000/notes")
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
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h3 className="text-center m-3">{strings.IndexPageHeader}</h3>
                    <span className="m-4">Change Language: </span>
                    <select onChange={this.handleLanguageChange}>
                        <option value="en">English</option>
                        <option value="ru">Russian</option>
                    </select>

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
                                    <td>{item.text}</td>
                                    <td>{item.created_at}</td>
                                    <td>
                                        <button type="button" onClick={()=>this.handleDeleteRow(i)} className="btn btn-danger">{strings.DelBtnText}</button>
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

export default App;
