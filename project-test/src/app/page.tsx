'use client'
import { useState } from 'react'
import Header from '../../layout/Header'
import Form from '../../layout/Form'
import Table from '../../layout/Table'
import Link from 'next/link'


export default function Home (): JSX.Element {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Vanessa tetona']
  const [likes, setLikes] = useState(0)

  function handleClick (): void {
    setLikes(likes + 1)
  }

  return (
    <div>
      <Header title='Develop. Preview. Gooo' />
      <ul>
        {names.map((name, id) => (
          <Link href={`/${id}`}><li key={name}>{name}</li></Link>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
      <Form/>
      <Table/>
    </div>
  )
}
