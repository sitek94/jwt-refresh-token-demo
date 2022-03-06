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
