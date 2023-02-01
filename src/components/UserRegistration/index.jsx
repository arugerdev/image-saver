
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function UserRegistration ({ singUp, singIn, setEmail, setPassword }) {
  const [type, setType] = useState('SignUp')

  return (
    <>
      <h1 className='title'>ImageSaver</h1>

      {(type === 'SignUp') &&
        <>
          <Form>
            <Form.Group className='mb-3' style={{ maxWidth: '500px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <Form.Label>Registrate para entrar en la web</Form.Label>
              <Form.Control type='email' placeholder='Inserta un email...' onChange={(e) => setEmail(e.target.value)} />
              <Form.Control autoComplete='current-password' type='password' placeholder='Inserta una contraseña...' onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button
              onClick={(e) => {
                e.preventDefault()
                singUp()
              }} variant='primary'
            >Registrarse
            </Button>
          </Form>
          <button
            onClick={(e) => {
              e.preventDefault()
              setType('SignIn')
            }} style={{ background: 'none', color: '#0d92ff', textDecoration: 'underline' }}
          >Iniciar Sesión
          </button>
        </>}

      {(type === 'SignIn') &&
        <>
          <Form>
            <Form.Group className='mb-3' style={{ maxWidth: '500px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <Form.Label>Inicia Sesión</Form.Label>
              <Form.Control type='email' placeholder='Inserta tu email...' onChange={(e) => setEmail(e.target.value)} />
              <Form.Control autoComplete='current-password' type='password' placeholder='Inserta tu contraseña...' onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button
              onClick={(e) => {
                e.preventDefault()
                singIn()
              }} variant='primary'
            >Iniciar Sesión
            </Button>
          </Form>
          <button
            onClick={(e) => {
              e.preventDefault()
              setType('SignUp')
            }} style={{ background: 'none', color: '#0d92ff', textDecoration: 'underline' }}
          >Registrarse
          </button>
        </>}
    </>

  )
}
