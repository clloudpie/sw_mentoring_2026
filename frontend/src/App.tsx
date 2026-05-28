import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState("로딩 중...")

  useEffect(() => {
    fetch("http://localhost:8000/hello")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <div>
      <h1>서버 응답:</h1>
      <p>{message}</p>
    </div>
  )
}

export default App