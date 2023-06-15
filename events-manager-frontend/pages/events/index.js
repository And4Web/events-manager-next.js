import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

export default function EventsPage({events}) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>} 

       {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(`${API_URL}/events?populate=*&_sort=date:ASC`)
    const events = await res.json()
    // console.log({events})
    return {
      props: {events: events.data},
      revalidate: 1,
    }
  } catch (error) {
    console.log("Error fetching data in pages/events.js", error)
  }
 
}
