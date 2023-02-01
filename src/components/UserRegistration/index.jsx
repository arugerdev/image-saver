
import { Form, Button } from 'react-bootstrap'

export default function UserRegistration ({ magicLinkLogin, setEmail }) {
  return (
    <>
      <h1>Welcome to ImageSaver</h1>
      <Form onSubmit={(e) => {
        e.preventDefault()
        magicLinkLogin()
      }}
      >
        <Form.Group className='mb-3' style={{ maxWidth: '500px' }}>
          <Form.Label>Enter an email to sign in with a Supabase Magic Link</Form.Label>
          <Form.Control type='email' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Button variant='primary'>Get Magic Link</Button>
      </Form>
    </>
  )
}
