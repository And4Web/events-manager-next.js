import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

export default function EventsPage(props) {
  // const {events} = props;
  // console.log("events: ", events[0])
  return (
    <Layout>
      <h1>Events</h1>
      {/* {events.length === 0 && <h3>No events to show</h3>} */}

      {/* {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))} */}
    </Layout>
  );
}

// export async function getServerSideProps(){
//   try {
//     const {response, errors} = await fetch(`${API_URL}/events`);
//     if(errors || !response){
//       return {notFound: true}
//     }else{
//       const events = response.json()
//       return {props: {events}}
//     }
//   } catch (error) {
//     console.log("error from try-catch: ", error)
//   }
// }
