import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        }

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    render() {
        return (
            <div className="SearchBar">
                <h2>Hey, {this.props.userID || 'guest'}!</h2>
                <br />
                <input
                    placeholder="Enter a song, album or artist"
                    onChange={this.handleTermChange} />
                <button
                    className="SearchButton"
                    onClick={this.search}>SEARCH</button>
            </div>
        );
    }

    search() {
        const term = this.state.term;

        this.props.onSearch(term);
    }

    handleTermChange(e) {
        const term = e.target.value;

        this.setState({term});
    }

}