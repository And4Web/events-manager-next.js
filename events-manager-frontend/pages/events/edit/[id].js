import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaImage } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import Modal from '@/components/Modal';

export default function EditEventPage({evt}) {
  let {name, performers, venue, address, date, time, description} = evt.attributes;
  const [values, setValues] = useState({
    name,
    performers,
    venue,
    address,
    date,
    time,
    description,
  })
  
  const [imagePreview, setImagePreview] = useState((evt.attributes.image.data ? evt.attributes.image.data.attributes.formats.thumbnail.url : null));
  const [showModal, setShowModal] = useState(false); 

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({values})
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
    }
    
    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: values}),
    })

    // console.log({res});

    if (!res.ok) {
      toast.error('Something Went Wrong')
    } else {
      const evt = await res.json()
      toast.success("succesfully update the event.")
      router.push("/events")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout title='Add New Event'>
      <Link href='/events' legacyBehavior><a >{'<'}View all Events</a></Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        

        <input type='submit' value='Update Event' className='btn' />
      </form>

      <h2>Image preview:</h2>
        {imagePreview ? (
          <div>
          <Image src={imagePreview} height={100} width={170} alt={imagePreview}/>
        </div>
        ) : (
          <div>
            <p>No Image Available</p>
          </div>
        )}
        <button className='btn-secondary btn-icon' style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} onClick={()=>setShowModal(true)}><FaImage style={{margin: ".2rem"}}/>Update Image</button>
        <Modal show={showModal} onClose={()=>setShowModal(false)} >Image Upload</Modal>
    </Layout>
  )
}

export async function getServerSideProps({params: {id}}){
  const res = await fetch(`${API_URL}/events/${id}?populate=*`);
  const event = await res.json();
  // console.log(event.data.attributes)

  return {
    props: {
      evt: event.data
    }
  }
}