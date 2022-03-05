import * as React from 'react'

function App() {
  const login = (email: string, password: string) => {}
  return (
    <div>
      <hgroup>
        <h1>Sign in</h1>
        <h2>And watch the magic happen</h2>
      </hgroup>
      <FormLogin onSubmit={login} />
    </div>
  )
}

function FormLogin({
  onSubmit,
}: {
  onSubmit(email: string, password: string): void
}) {
  const [email, setEmail] = React.useState('maciek@maciek.com')
  const [password, setPassword] = React.useState('maciek')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default App
