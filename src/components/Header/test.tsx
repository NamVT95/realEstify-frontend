import { useState } from 'react'

export default function Component() {
  const [name, setName] = useState('UyLe')

  const handleClickSetName = () => {
    setName('React Developer')
  }

  return (
    <div>
        <button onClick={handleClickSetName}>Click to change name</button>
        <div>Hello {name}</div>
    </div>
  )
}
