import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'

import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import { useRouter } from 'next/router'

export default function EventPage({evt}) {
  const router = useRouter()
  console.log("event: ", evt)

  const deleteEvent = async ()=>{
    if(confirm("Are you sure, you want to delete this event?")){
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if(!res.ok){
        toast.error(data.message)
      }else{
        router.push("/events")
      }
    }
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`} legacyBehavior>
            <a><FaPencilAlt/>Edit Event</a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>Delete Event</a>
        </div>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString('en-US')} at {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        <ToastContainer />
        {evt.attributes.image && (
          <div className={styles.image}>
            <Image
              src={evt.attributes.image.data.attributes.formats.large.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href='/events' legacyBehavior>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events?populate=*`)
  const events = await res.json()

  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }) {
  // const res = await fetch(`${API_URL}/events?slug=${slug}&populate=*`)
  const res = await fetch(`${API_URL}/slugify/slugs/event/${slug}?populate=*`)
  const event = await res.json() 
  
  console.log("single event: ", event.data);
  
  return {
    props: {
      evt: event.data || [],
    },
    revalidate: 1,
  }
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/events/${slug}`)
//   const event = await res.json()
//   console.log("slug: ", event);


//   return {
//     props: {
//       evt: event[0],    
//     }
    
//   }
// }
