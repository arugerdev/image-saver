import './App.css'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
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
  const [images, setImages] = useState([])

  const CDNURL = 'https://keupyfhcksedgvzqhesn.supabase.co/storage/v1/object/public/images/'

  async function getImages () {
    const { data, error } = await supabase.storage.from('images').list(user?.id + '/', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    })

    if (data !== null) {
      setImages(data)
    } else {
      console.log(error)
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

  async function magicLinkLogin () {
    const { data, error } = await supabase.auth.signInWithOtp({
      email, options: { emailRedirectTo: 'https://image-saver.vercel.app' }
    })

    if (error) {
      console.log(error)
    } else if (data) {
      console.log('Please see your email')
    }
  }

  async function signOut () {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    }
  }

  async function uploadImage (e) {
    const file = e.target.files[0]

    const { data, error } = await supabase.storage.from('images').upload(user.id + '/' + uuidv4(), file)

    if (data) {
      getImages()
    } else {
      console.log(error)
    }
  }

  async function deleteImage (imageName) {
    const { error } = await supabase.storage.from('images').remove([user.id + '/' + imageName])

    if (error) {
      console.log(error)
    } else {
      getImages()
    }
  }

  return (
    <div className='App'>
      <Container>
        {user === null
          ? <UserRegistration magicLinkLogin={magicLinkLogin} setEmail={setEmail} />
          : <MainPage signOut={signOut} uploadImage={uploadImage} downloadAll={downloadAll} deleteImage={deleteImage} images={images} user={user} CDNURL={CDNURL} />}
      </Container>
    </div>
  )
}

export default App
