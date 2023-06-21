import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/EventItem.module.css'

export default function EventItem({ evt }) {
  // console.log({evt});
  const imagePresent = (evt) => {
    const isPresent = (evt.image !== null) || (evt.image !== undefined) || (evt.image !== "");
    // console.log({isPresent});
    return isPresent;
  }  
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            // (evt.image)
              imagePresent(evt)
              ? evt.image.data.attributes.formats.thumbnail.url
              : '/images/event-default.png'
          }
          width={170}
          height={100}
          alt='Image'
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`} legacyBehavior>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}
