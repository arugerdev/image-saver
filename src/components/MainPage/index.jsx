import ImageCard from '../ImageCard'
import { Form, Button } from 'react-bootstrap'
export default function MainPage ({ signOut, uploadImage, downloadAll, deleteImage, images, user, CDNURL }) {
  return (
    <>
      <h1>Your ImageSaver</h1>
      <p>Usuario actual: {user.username}</p>
      <p>Correo: {user.email}</p>
      <p>Usa el boton de "Selecionar archivo" para subir fotos de tu galería.</p>

      <Form.Group className='mb-3' style={{ maxWidth: '500px' }}>
        <Form.Control type='file' accept='image/png, image/jpg' onChange={(e) => uploadImage(e)} />
      </Form.Group>
      <hr />
      <h3>Your images</h3>
      <header className='imagesFilterSection'>
        <button
          onClick={() => downloadAll()}
          className='imagesFilter_downloadAll'
        >

          <svg fill='currentcolor' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z' /></svg>
        </button>
      </header>
      <section style={{ paddingBottom: '3rem' }} className='imagesGrid'>
        {(images) &&
              images.map((item) => {
                return (
                  <ImageCard handleRemove={() => deleteImage(item.name)} key={CDNURL + user.id + '/' + item.name} data={item} url={CDNURL + user.id + '/' + item.name} />
                )
              })}
      </section>
      <Button onClick={() => signOut()}>Salir de la cuenta</Button>
    </>
  )
}
