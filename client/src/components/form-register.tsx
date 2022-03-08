import * as React from 'react'

const initialState = {
  email: 'nikola@tesla.com',
  password: 'future',
  passwordConfirm: 'future',
  firstName: 'Nikola',
  lastName: 'Tesla',
}

export function FormRegister({
  onSubmit,
}: {
  onSubmit(data: typeof initialState): void
}) {
  // TODO: Remove initial states, it's here only for development purposes, so
  //   that I don't have to type this all the time.
  const [values, setValues] = React.useState(initialState)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label>
        First Name
        <input
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Password Confirm
        <input
          type="password"
          name="passwordConfirm"
          value={values.passwordConfirm}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
