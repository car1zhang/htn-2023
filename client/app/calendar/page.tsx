'use client'
import React from 'react'
import Link from 'next/link';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

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
        <div key={key} className="p-2 w-[calc(14%-6px)] h-20 bg-white rounded-md text-xs md:text-base text-white font-serif">
          <h1 className={(new Date(year, month, day)).toDateString() === (new Date()).toDateString() ? 
            '-ml-1 -mt-1 px-1 sm:px-2 py-1 w-fit bg-secondary text-white rounded-full' : '-ml-1 -mt-1 px-1 sm:px-2 py-1 text-black'
          }>{day}</h1>
          {notes.map(note => ((new Date(year, month, day)).toDateString() === (new Date(note['date'])).toDateString() ?
            <h1 key={note['_id']} className='font-sans mt-1 px-2 py-1.5 text-xs rounded-md cursor-pointer bg-primary border-white overflow-hidden'>
              <Link href={'/note/'+note['_id']+'/'}>
                {note['title']}
              </Link>
            </h1>
          : '' ))}
        </div>
      )
    } else {
      return (<div key={key} className="w-[calc(14%-6px)] h-20" />)
    }
  }

  function renderCalendar() {
    const cal : React.JSX.Element[] = []
    let key = 0;
    for(let i = 0; i < 7; i++, key++) cal.push(
      <div key={key} className="p-2 w-[calc(14%-6px)] h-9 bg-black rounded-md flex justify-center items-center">
        <h1 className="text-xs md:text-base text-white font-serif">{window.innerWidth < 1024 ? dayNames[i][0] : dayNames[i]}</h1>
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
    <div className="px-64 mb-10">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl my-3 font-sans text-black">{monthNames[month]} {year}</h1>
          <div className="flex items-center">
            <GoChevronLeft className="hover:cursor-pointer text-9xl px-2" onClick={prevMonth} />
            <div className="my-3 px-2 py-4 flex flex-wrap bg-grey rounded-lg justify-center gap-2 drop-shadow-lg">{calendar}</div>
            <GoChevronRight className="hover:cursor-pointer text-9xl px-2" onClick={nextMonth} />
          </div>
        </div>
    </div>
  )
}