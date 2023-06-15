import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout>
      <Link href="/" legacyBehavior>
        <a>{"<"}Go back to Home</a>
      </Link>
      <h1>Search Result for "{router.query.term}"</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  try {
    const query = qs.stringify(
      {
        filters: {
          $or: [
            {
              name: {
                $contains: `${term}`,
              },
            },
            {
              performers: {
                $contains: `${term}`,
              },
            },
            {
              description: {
                $contains: `${term}`,
              },
            },
            {
              venue: {
                $contains: `${term}`,
              },
            },
            {
              address: {
                $contains: `${term}`,
              },
            },
          ],
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    const res = await fetch(`${API_URL}/events?${query}&populate=*`);
    const events = await res.json();
    // console.log({events})
    return {
      props: { events: events.data },
    };
  } catch (error) {
    console.log("Error fetching data in pages/events.js", error);
  }
}
