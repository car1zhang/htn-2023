'use client'
import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

export default function Calendar() {

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const [notes, setNotes] = React.useState([])

  const [year, setYear] = React.useState((new Date()).getFullYear())
  const [month, setMonth] = React.useState((new Date()).getMonth())

  const [calendar, setCalendar] = React.useState(new Array())

  const getNumDays = () => (new Date(year, month + 1, 0)).getDate()
  const getFirstDay = () => (new Date(year, month, 1)).getDay()

  function Day(day: number, isActive: boolean, key: number) {
    if(isActive) {
      return (
        <div key={key} className="mb-2 p-2 w-[calc(14%-2px)] h-28 bg-white text-xs md:text-base text-white font-mono">
          <h1 className={(new Date(year, month, day)).toDateString() === (new Date()).toDateString() ? 
            '-ml-1 -mt-1 px-1 sm:px-2 py-1 w-fit bg-secondary text-white rounded-full' : ''
          }>{day}</h1>
          {notes.map(note => ((new Date(year, month, day)).toDateString() === (new Date(note['date'])).toDateString() ?
            (window.innerWidth < 640 ? 
            <div key={note['_id']} className='mt-1 px-2 py-1.5 h-16 rounded-md cursor-pointer border-2 bg-primary'/>
            :
            <h1 key={note['_id']} className='mt-1 px-2 py-1.5 text-xs rounded-md cursor-pointer border-2 border-white overflow-hidden'>
              {note['title']}
            </h1>)
          : '' ))}
        </div>
      )
    } else {
      return (<div key={key} className="mb-2 w-[calc(14%-2px)] h-28 bg-dark" />)
    }
  }

  function renderCalendar() {
    const cal : React.JSX.Element[] = []
    let key = 0;
    for(let i = 0; i < 7; i++, key++) cal.push(
      <div key={key} className="mb-2 p-2 w-[calc(14%-2px)] h-12 bg-black flex justify-center items-center">
        <h1 className="text-xs md:text-base text-white font-mono">{window.innerWidth < 1024 ? dayNames[i][0] : dayNames[i]}</h1>
      </div>
    )
    for(let i = 1; i <= getFirstDay(); i++, key++) cal.push(Day(0, false, key))
    for(let i = 1; i <= getNumDays(); i++, key++) cal.push(Day(i, true, key))
    for(let i = 1; i <= (getFirstDay() + getNumDays() > 35 ? 42 : 35) - getFirstDay() - getNumDays(); i++, key++) cal.push(Day(0, false, key))
    setCalendar(cal)
  }
  function prevMonth() {
    if(month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else setMonth(month - 1)
    renderCalendar()
  }
  function nextMonth() {
    if(month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else setMonth(month + 1)
    renderCalendar()
  }

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/notes/', {'cache': 'no-store'}).then(res => res.json()).then(data => {
      setNotes(data)
      renderCalendar()
    })
  })

  return (
    <div className="w-full">
      {notes.length ?
        <div className="my-8 w-full">
          {calendar}
        </div>
      : ''}
      <div className="h-[calc(7rem*7)]" />
    </div>
  )
}