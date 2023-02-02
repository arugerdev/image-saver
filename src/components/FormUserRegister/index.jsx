import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

export const FormUserRegister = ({ signUp, signIn, setEmail, setPassword }) => {
  const [type, setType] = useState('SignUp')
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, updatePassword] = useState('')
  const [newEmail, updateEmail] = useState('')
  const [typeChanges] = useState({
    signUpType:
      {
        description: 'Registrate para entrar en la web',
        action: 'Registrarse',
        actionChanger: 'Iniciar Sesión'
      },
    signInType:
      {
        description: 'Inicia Sesión con tu cuenta',
        action: 'Iniciar Sesión',
        actionChanger: 'Registrarse'
      }
  })

  const [changes, setChanges] = useState(typeChanges.signUpType)

  useEffect(() => {
    setPassword(newPassword)
  }, [newPassword])
  useEffect(() => {
    setEmail(newEmail)
  }, [newEmail])

  useEffect(() => {
    if (type === 'SignUp') {
      setChanges(typeChanges.signUpType)
    }
    if (type === 'SignIn') {
      setChanges(typeChanges.signInType)
    }
  }, [type])

  return (
    <>
      <Form onSubmit={(e) => {
        e.preventDefault()
        changes.onClickFunction()
      }}
      >
        <Form.Group className='mb-3' style={{ maxWidth: '500px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <Form.Label>{changes.description}</Form.Label>
          <Form.Control type='email' placeholder='Email' onChange={(e) => updateEmail(e.target.value)} />
          <section style={{ display: 'flex', flexDirection: 'row' }}>

            <Form.Control autoComplete='current-password' type={(showPassword === false ? 'password' : 'text')} placeholder='Contraseña' onChange={(e) => updatePassword(e.target.value)} style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }} />

            <button type='button' onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword) }} style={{ display: 'flex', backgroundColor: 'lightgray', color: 'var(--background)', padding: '0', width: '48px', height: '40px', placeItems: 'center', justifyContent: 'center', borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}>
              {(!showPassword) &&
                <svg style={{ width: '30px', height: '30px', padding: '0' }} fill='currentcolor' clipRule='evenodd' fillRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z' fillRule='nonzero' /></svg>}
              {(showPassword) &&
                <svg style={{ width: '30px', height: '30px', padding: '0' }} fill='currentcolor' clipRule='evenodd' fillRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z' fillRule='nonzero' /></svg>}
            </button>
          </section>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={!(newPassword.length > 6 && newEmail.length > 0)}
            onClick={(e) => {
              e.preventDefault()
              if (type === 'SignUp') signUp()
              if (type === 'SignIn') signIn()
            }} variant='primary'
          >{changes.action}
          </button>
          <button
            variant='secondary'
            onClick={(e) => {
              e.preventDefault()
              setType((type === 'SignUp' ? 'SignIn' : 'SignUp'))
            }} style={{ background: 'none', color: '#0d92ff', textDecoration: 'underline', fontSize: '10px' }}
          >{changes.actionChanger}
          </button>
        </Form.Group>

      </Form>

    </>

  )
}
