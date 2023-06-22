import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function HomePage({ events }) {
  // console.log({events})
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      {events.data.length > 0 && (
        <Link href='/events' legacyBehavior>
          <a className='btn-secondary'>Show All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?populate=*&sort=date:ASC&pagination[start]=0&pagination[limit]=3`)
  const events = await res.json()
  // console.log("EVENTS: ", events.data[0])
  return {
    props: {events},
    revalidate: 1,
  }
}
