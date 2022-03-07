import { useAuth } from './auth/auth.provider'

export function Spinner() {
  return <div style={{ transform: 'scale(2)' }} aria-busy="true" />
}

export function FullPageSpinner() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  )
}

export function NavAuthenticated() {
  const { logout } = useAuth()
  return (
    <nav>
      <ul>
        <li>
          <strong>JWT Demo</strong>
        </li>
      </ul>
      <ul>
        <li>
          <button className="outline secondary" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
