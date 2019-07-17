import React, { Component } from "react";

class SearchEngine extends Component {
    state = {
        view: "simple",
        textPicker: "",
        datePicker: ""
    };
    updateStateView = e => {
        e.preventDefault();
        let inputValue = {};
        console.log("I catched you");
        this.setState({ view: "edit" });
        if (this.state.textPicker && this.state.datePicker) {
            inputValue.text = this.state.textPicker;
            inputValue.date = this.state.datePicker;
            console.log(inputValue, "wqwdqw");
        } else if (this.state.textPicker && !this.state.datePicker) {
            inputValue.text = this.state.textPicker;
            inputValue.date = "null";
            console.log(inputValue, "wqwdqw");
        } else if ( this.state.datePicker && !this.state.textPicker ) {
            console.log(inputValue, "just a date"); 
          inputValue.text = "null";
          inputValue.date = this.state.datePicker;
          
                      
        } else if (!this.state.textPicker && !this.state.datePicker) {
            console.log("value wasnt find ");
        }
        this.props.handleStateChange(inputValue);
    };
    updateText = event => {
        this.setState({ textPicker: event.target.value });
    };
    updateDate = event => {
        this.setState({ datePicker: event.target.value });
        
    };
    render() {
        let prec = this.props.data;
        console.log(prec);
        return (
            <form class="form-inline md-form form-sm active-pink active-pink-2 mt-2">
                <i class="fas fa-search" aria-hidden="true" />
                <input
                    class="form-control form-control-sm ml-2 w-35"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    value={this.state.textPicker}
                    onChange={this.updateText}
                />
                <i class="fas fa-calendar" aria-hidden="true" />
                <input
                    class="form-control form-control-sm ml-2 w-35"
                    type="date"
                    placeholder="Search"
                    aria-label="Search"
                    value={this.state.datePicker}
                    onChange={this.updateDate}
                />

                <button
                    type="submit"
                    class="btn searchButton"
                    onClick={this.updateStateView}
                >
                    Submit
                </button>
            </form>
        );
    }
}
export default SearchEngine;
