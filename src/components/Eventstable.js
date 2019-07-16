import React, { Component } from "react";
import Truncate from "react-truncate-html";
import { db } from "../firebase/firebase";
import SearchEngine from "../firebase/SearchEngine";
let mutationState;
class EventsTable extends Component {
  constructor () {
    super();
    this.handleStateChange = this.handleStateChange.bind(this);
  }
    state = {
        items: "",
        query: "",
        data: [{ description: "aiajajjsjs" }],
        searchData : []
    };
    

    handleStateChange(value){
        
        let searchData = this.state.searchData;
        searchData.push(value);
        this.setState({ searchData : searchData})
    }
    createMarkup(lenta) {
        return { __html: lenta };
    }
    componentDidMount() {
        console.log(this.state);

        db.ref("events/").on("value", function(snapshot) {
            mutationState = snapshot.val();
        });

        setTimeout(() => {
            console.log(mutationState, "componenDidMount");
            this.setState({
                data: mutationState
            });
        }, 100);
    }
    render() {
        let my;
        return (
            <div className="container">
                <div>
                    <SearchEngine handleStateChange={this.handleStateChange} />
                </div>
                <ul className="row d-flex">
                    {this.state.data.map((key, i) => (
                        <li key={i} className="col-md-3 list-group-item">
                            <h4>{key.title}</h4>
                            <span>{"id: " + key.id}</span>
                            <div className="image-event-container">
                                {" "}
                                <img
                                    className="img-responsive"
                                    src={key.img}
                                    alt=""
                                />{" "}
                            </div>
                            <p>{"Location " + key.city}</p>

                            <Truncate
                                lines={5}
                                data={i}
                                dangerouslySetInnerHTML={this.createMarkup(
                                    key.description
                                )}
                            />

                            <p>{"Start " + key.start + ", End " + key.end}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default EventsTable;
