import React, { useEffect, useState } from "react";
import "./events.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const query = {
        query: `
          query {
            events {
              title,
              description,
              date,
              price,
              creator {
                email,
              },
              _id
            }
          }
        `
      };
      let response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
      });
      response = await response.json();
      setEvents(response.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <h1 className="events__heading">Events</h1>
      <div className="events__events-grid">
        {events.map(event => (
          <div tabindex="0" className="events__event-tile" key={event._id}>
            <h3>{event.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Events;
