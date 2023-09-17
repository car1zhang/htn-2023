"use client"
import React from 'react'

export default function Note({ params }: { params: { _id: string }}) {

  const [title, setTitle] = React.useState("")
  const [date, setDate] = React.useState(new Date())
  const [description, setDescription] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [recordingId, setRecordingId] = React.useState("")

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/notes/'+params._id+'/', {'cache': 'no-store'}).then(res => res.json()).then(data => {
      setTitle(data.title)
      setDate(new Date(data.date))
      setDescription(data.description)
      setNotes(data.notes)
      setRecordingId(data.recording_id)
    })
  })

  return (
    <div className="px-72">
      {title.length > 0 ?
      <div className="my-8 text-black">
        <h1 className="mb-3 font-serif text-3xl font-bold">{title}</h1>
        <div className="flex justify-between items-center">
          <h2 className="mb-3 font-serif text-md">{description}</h2>
          <h2 className="mb-3 font-serif text-md">{date.toLocaleDateString()}</h2>
        </div>
        <hr />
        <p className="my-3 font-serif text-md">{notes}</p>
      </div>
      : ''}
    </div>
  )
}