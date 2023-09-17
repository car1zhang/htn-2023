"use client"
import Link from 'next/link'
import React from 'react'

export default function Note({ params }: { params: { _id: string }}) {

  const [title, setTitle] = React.useState("")
  const [date, setDate] = React.useState(new Date())
  const [description, setDescription] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [recordingId, setRecordingId] = React.useState("")

  const [isEditTitle, setIsEditTitle] = React.useState(false)
  const [isEditDescription, setIsEditDescription] = React.useState(false)
  const [isEditNotes, setIsEditNotes] = React.useState(false)

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
    <div className="px-72">
      {recordingId.length > 0 ?
      <div className="my-8 text-black flex flex-col">
        { isEditTitle ?
          <input className="mb-3 font-serif text-3xl font-bold bg-white" onChange={e => setTitle(e.target.value)} value={title} onBlur={async e => {
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
            <input className="mb-3 font-serif text-md bg-white w-96" onChange={e => setDescription(e.target.value)} value={description} onBlur={async e => {
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
            <h2 className="mb-3 font-serif text-md" onClick={() => setIsEditDescription(true)}>{description}</h2>
          }
          <h2 className="mb-3 font-serif text-md">{date.toLocaleDateString()}</h2>
        </div>
        <hr className="mb-3" />
        { isEditNotes ?
            <textarea className="mb-3 font-serif text-md bg-white w-96" onChange={e => setNotes(e.target.value)} value={notes} onBlur={async e => {
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
            <p className="mb-6 font-serif text-md" onClick={() => setIsEditNotes(true)}>{notes}</p>
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
  )
}