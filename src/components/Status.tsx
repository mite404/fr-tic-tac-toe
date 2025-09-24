

export function Status(props) {
  const { statusMessage } = props

  return (
    <>
      <h2 id="statusText"
        className="read-the-docs">{statusMessage}</h2>
    </>
  )
}