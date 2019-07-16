import React, { Component } from "react";
import { db } from "../firebase/firebase";
import EventsTable from "./Eventstable";


let dataClean = [];
class EventsBase extends Component {
  componentWillMount() {
    fetch(
      "https://api.helsingborg.se/event/json/wp/v2/event/?_embed&per_page=100"
    )
      .then(function(response) {
        // console.log(response, "saass");
        return response.json();
      })
      .then(function(myJson) {
        let convert;
        let element;

        function convertObjectValuesRecursive(obj, target, replacement) {
          obj = { ...obj };
          Object.keys(obj).forEach(key => {
            if (obj[key] == target) {
              obj[key] = replacement;
            } else if (
              typeof obj[key] == "object" &&
              !Array.isArray(obj[key])
            ) {
              obj[key] = convertObjectValuesRecursive(
                obj[key],
                target,
                replacement
              );
            }
          });
          convert = obj;
        //   console.log("ssss", convert);
          return obj;
        }

        convertObjectValuesRecursive(myJson, null, "null");
        console.log(convert, "out function");
        for (const key in convert) {
          if (convert.hasOwnProperty(key)) {
            element = convert[key];
            //  console.log(element,'LLLLLLLLLLLLLLLLL',key);
          }
          if (
            element._embedded.hasOwnProperty("location") &&
            element._embedded.location[0].hasOwnProperty("city") &&
            element.hasOwnProperty("occasions") &&
            element.occasions[0].hasOwnProperty("start_date") &&
            element.occasions[0].hasOwnProperty("end_date") &&
            element.hasOwnProperty("title") &&
            element.title.hasOwnProperty("plain_text") &&
            element.hasOwnProperty("content") &&
            element.content.hasOwnProperty("rendered") &&
            element.hasOwnProperty("id") &&
            element.hasOwnProperty("featured_media") &&
            element.featured_media.hasOwnProperty("source_url")
          ) {
            dataClean.push({
              city: element._embedded.location[0].city,
              start: element.occasions[0].start_date,
              end: element.occasions[0].end_date,
              img: element.featured_media.source_url,
              id: element.id,
              title: element.title.plain_text,
              description: element.content.rendered
            });
          } else {
            console.log(key, ",,,,,,,,");
          }
        }
        console.log(dataClean, "ttrhr");
        let writeUserData = dataClean => {
          db.ref("events/").set(dataClean);
        };
        writeUserData(dataClean);
        return myJson;
      })
      .catch(error => console.error(error));
  }
  render() {
    return (
      <div className="eventsBlock">
        <p>OOOOOOO</p>
        
        <EventsTable />
      </div>
    );
  }
}
export default EventsBase;
