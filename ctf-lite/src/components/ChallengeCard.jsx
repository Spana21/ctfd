export default function ChallengeCard({ challenge, onSubmit, scores }) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (!input) return
    onSubmit(challenge.id, challenge.points)
    setInput('')
  }

  const solved = scores?.[challenge.id]

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h3>{challenge.name}</h3>
      <p>{challenge.description}</p>
      <p>Body: {challenge.points}</p>
      {solved ? (
        <p style={{ color: 'green' }}>Vyřešeno</p>
      ) : (
        <>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Zadejte flag" />
          <button onClick={handleSubmit}>Odevzdat</button>
        </>
      )}
    </div>
  )
}
