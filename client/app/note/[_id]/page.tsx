"use client"
import Link from 'next/link'
import React from 'react'
import BackButton from "../../images/back.png"
import Image from 'next/image'

export default function Note({ params }: { params: { _id: string }}) {

  const [title, setTitle] = React.useState("")
  const [date, setDate] = React.useState(new Date())
  const [description, setDescription] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [recordingId, setRecordingId] = React.useState("")

  const [isEditTitle, setIsEditTitle] = React.useState(false)
  const [isEditDescription, setIsEditDescription] = React.useState(false)
  const [isEditNotes, setIsEditNotes] = React.useState(false)

  const [question, setQuestion] = React.useState('')
  const [answer, setAnswer] = React.useState('')

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/notes/'+params._id+'/', {'cache': 'no-store'}).then(res => res.json()).then(data => {
      setTitle(data.title)
      setDate(new Date(data.date))
      setDescription(data.description)
      setNotes(data.notes)
      setRecordingId(data.recording_id)
    })
  }, [])

  return (
    <div>

    <div className="px-72">
      {title.length > 0 ?
      <div className="my-8 text-black flex flex-col">
        <Link href="/calendar"><h1 className='mb-3 hover:border-[#7C2D12] bg-transparent hover:bg-red-500/50 hover:text-[#7C2D12] '> ← Back </h1> </Link>
        { isEditTitle ?
          <input className="mb-3 font-serif text-3xl font-bold w-3/4 bg-white" onChange={e => setTitle(e.target.value)} value={title} onBlur={async e => {
            await fetch('http://127.0.0.1:8000/notes/'+params._id+'/', {
              method: "PUT",
              mode: "cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({title: title, description: null, notes: null})
            })
            setIsEditTitle(false)
            }}/> :
          <h1 className="mb-3 font-serif text-3xl font-bold" onClick={() => setIsEditTitle(true)}>{title}</h1>
        }
        <div className="flex justify-between items-center">
          { isEditDescription ?
            <textarea className="mb-3 font-serif text-md bg-white w-3/4 leading-relaxed" onChange={e => setDescription(e.target.value)} value={description} onBlur={async e => {
              await fetch('http://127.0.0.1:8000/notes/'+params._id+'/', {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({title: null, description: description, notes: null})
              })
              setIsEditDescription(false)
              }}/> :
            <h2 className="mb-3 font-serif text-md w-3/4 leading-relaxed" onClick={() => setIsEditDescription(true)}>{description}</h2>
          }
          <h2 className="mb-3 font-serif text-md">{date.toLocaleDateString()}</h2>
        </div>
        <hr className="mb-3" />

          <form onSubmit={e => {
            e.preventDefault()
            fetch('http://127.0.0.1:8000/notes/chat/'+params._id+'/'+question.replace(' ', '%20')).then(res => res.json()).then(data => setAnswer(data))
          }}>
            <input placeholder='Ask me anything...' className="bg-white w-full p-3 text-md mb-3" onChange={e => setQuestion(e.target.value)} />
            {answer.length ? <p className="mb-3 font-serif text-md leading-relaxed">{answer}</p> : ''}
          </form>
          
        <hr className="mb-3" />
        { isEditNotes ?
            <textarea className="mb-3 font-serif text-md bg-white w-full h-full leading-relaxed" rows={10} onChange={e => setNotes(e.target.value)} value={notes} onBlur={async e => {
              await fetch('http://127.0.0.1:8000/notes/'+params._id+'/', {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({title: null, description: null, notes: notes})
              })
              setIsEditNotes(false)
              }} /> :
            <p className="mb-6 font-serif text-md whitespace-pre-line leading-relaxed" onClick={() => setIsEditNotes(true)}>{notes}</p>
          }
        <Link href='/calendar/' className="self-start text-black hover:border-[#7C2D12] bg-transparent hover:bg-red-500/50 hover:text-[#7C2D12] text-center border border-solid border-black p-2 lg:px-4 rounded duration-300 transition-colors"
          data-test-id={`navbar-logout`}
          onClick={async () => await fetch('http://127.0.0.1:8000/notes/'+params._id+'/', {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin"
          })}>Delete</Link>
      </div>
      : ''}
    </div>
    </div>
  )
}