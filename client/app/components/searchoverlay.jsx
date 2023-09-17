import { useState, useEffect } from 'react';
import Link from 'next/link'

export default function SearchOverlay({ setIsSearch }) {
  const [indices, setIndices] = useState([])
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/notes/', {'cache': 'no-store'}).then(res => res.json()).then(data => {
      setNotes(data)
    })
  }, [])
  
  return (
    <div className="z-50 fixed w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-1/3 h-4/5 rounded-lg p-6">
        <input placeholder="Search..." className="bg-white w-full p-3 text-xl mb-2" onChange={async e => {
          fetch('http://127.0.0.1:8000/notes/search/'+e.target.value.replaceAll(' ', '%20')).then(res => res.json()).then(data => {
            setIndices(data)
          })
        }}/>
        { indices.length ?
          indices.map(index => 
            <div key={notes[index]._id} className={'rounded-lg p-4 my-4 bg-primary text-white'}>
              <Link href={'/note/'+notes[index]._id}>
                <h1 class="font-sans text-md mb-2">{notes[index].title}</h1>
                <h2 class="font-serif text-xs">{notes[index].description}</h2>
              </Link>
            </div>
          ) : ''
        }
      </div>
      <div className="absolute -z-10 top-0 left-0 w-screen h-screen bg-black opacity-80" onClick={() => setIsSearch(false)} />
    </div>
  )
}