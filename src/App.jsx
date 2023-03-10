import './App.css'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { v4 as uuidv4 } from 'uuid'
import { saveAs } from 'file-saver'
import UserRegistration from './components/UserRegistration'
import MainPage from './components/MainPage'

function App () {
  const user = useUser()
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [images, setImages] = useState([])

  const CDNURL = 'https://keupyfhcksedgvzqhesn.supabase.co/storage/v1/object/public/images/'

  async function getImages () {
    const { data } = await supabase.storage.from('images').list(user?.id + '/', {
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    })

    if (data !== null) {
      setImages(data)
    }
  }

  useEffect(() => {
    if (user) {
      getImages()
    }
  }, [user])

  function downloadAll () {
    images.forEach(item => {
      saveAs(CDNURL + user.id + '/' + item.name, item.name)
    })
  }

  async function signUp () {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error)
    }
  }
  async function signIn () {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error)
    }
  }

  async function signOut () {
    await supabase.auth.signOut()
  }

  async function uploadImage (e) {
    const files = e.target.files
    for await (const newFile of files) {
      const { data } = await supabase.storage.from('images').upload(user.id + '/' + uuidv4(), newFile)

      if (data) { getImages() }
    }
  }

  async function deleteImage (imageName) {
    const { error } = await supabase.storage.from('images').remove([user.id + '/' + imageName])

    if (!error) {
      getImages()
    }
  }

  return (
    <>
      <div className='App'>
        <section className={'mainContainer' + (user === null ? ' register' : ' mainPage')}>
          {user === null
            ? <UserRegistration signIn={signIn} signUp={signUp} updateEmail={setEmail} udpatePassword={setPassword} />
            : <MainPage signOut={signOut} uploadImage={uploadImage} downloadAll={downloadAll} deleteImage={deleteImage} images={images} user={user} CDNURL={CDNURL} />}
        </section>
      </div>
      <div className='blob' />
      <div className='blob2' />
      <div className='blob3' />
    </>
  )
}

export default App
