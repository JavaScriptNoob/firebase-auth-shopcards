import React, { Component } from "react";
import Truncate from "react-truncate-html";
import { db } from "../firebase/firebase";
import SearchEngine from "../firebase/SearchEngine";
let mutationState = [" "];
class EventsTable extends Component {
	constructor() {
		super();
		this.handleStateChange = this.handleStateChange.bind(this);
		this.state = {
			items: "",
			query: "",
			data: [],
            date: [],
            location:[],
			view: "simple"
		};
		this._isMounted = false;
	}

	handleStateChange(value) {
        let location = this.state.location;
        let date =this.state.date
		if (location && date) {
			location.forEach(function(value, i, array) {
				array.shift(0);
            });
            date.forEach(function(value, i, array) {
				array.shift(0);
			});
		}

        date.push(value.date);
        location.push(value.text);
        this.setState({ 
            date: date, 
            view: "edit" ,
            location:location});
		let dirtyData = this.state.data;
        
        // if (this.state.searchData[0].text !== "null" &&
		// 	this.state.searchData[0].date !== "null"
		// ) {
		// 	console.log("filter by two values");
		// 	let cleanData = dirtyData.filter(function(d) {
		// 		return d.city !== "helsingborg";
		// 	});
		// 	console.log(
		// 		cleanData,
		// 		"clean data",
		// 		searchData[0].date,
		// 		searchData[0].text
		// 	);
		// } else if (
		// 	this.state.searchData[0].text !== "null" &&
		// 	this.state.searchData[0].date === "null"
		// ) {
		// 	console.log("filter by text");
		// } else if (
		// 	this.state.searchData[0].text === "null" &&
		// 	this.state.searchData[0].date !== "null"
		// ) {
		// 	console.log("filter by date");
		// } else {
		// 	console.log("im here");
		// }
		// let cleanData = dirtyData.filter(d => d.city !== "helsingborg");
		// console.log(
		// 	cleanData,
		// 	"clean data",
		// 	searchData[0].date,
		// 	searchData[0].text
		// );
	}
	createMarkup(lenta) {
		return { __html: lenta };
	}
	componentDidMount() {
		let that = this;
		this._isMounted = true;
		console.log(this.state, this._isMounted, "we ckeck out mounted");

		db.ref("events/")
			.once("value", function(snapshot) {
				mutationState = snapshot.val();
				console.log(mutationState, "componenDidMount", this);
			})
			.then(function() {
				if (that._isMounted) {
					console.log("its this here", that);
					that.setState({ data: mutationState });
				}
			});
	}
	componentWillMount() {
		this._isMounted = false;
	}
	getSnapshotFromFirebase() {}

	finalyFunc = () => {
		if (!this._isMounted) {
			this.setState({
				data: mutationState
			});
		}
	};
	render() {
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
