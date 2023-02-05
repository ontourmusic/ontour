import React from 'react'
import '../index.css'
import Show from './Show'

class UpcomingEvent {
  constructor(name, date, eventId, eventURL, timezone, eventTime) {
    this.name = name
    this.date = date
    this.eventId = eventId
    this.eventURL = eventURL
    this.eventTime = eventTime
  }
}

function parseDate(date) {
  const [year, month, day] = date.split('-')
  const newData = new Date(+year, month - 1, +day)
  var weekday = newData.toString().split(' ')[0]
  var monthStr = newData.toString().split(' ')[1]
  var dayStr = newData.toString().split(' ')[2]

  if (dayStr.charAt(0) == '0') {
    dayStr = dayStr.slice(1)
  }

  var fullDate = weekday + ', ' + monthStr + ' ' + dayStr
  return fullDate
}

function parseName(name) {
  var nameParse = name.split(' ')
  for (let j = 0; j < nameParse.length; j++) {
    nameParse[j] = nameParse[j].charAt(0) + nameParse[j].slice(1).toLowerCase()
  }
  var eventName = nameParse.join(' ')
  return eventName
}

function parseTime(eventTime) {
  var hours
  var minutes
  var time
  if (eventTime) {
    eventTime = eventTime.split(':')
    hours = eventTime[0]
    minutes = eventTime[1]
    time = hours > 12 ? hours - 12 : hours
    time += ':' + minutes
    time += hours >= 12 ? ' pm' : ' am'
  } else {
    time = ' '
  }
  return time
}

function parseTimezone(timezone) {
  if (!timezone) {
    timezone = ' '
  } else {
    timezone = timezone.split('/')[1]
    timezone = timezone.replace('_', ' ')
  }
  return timezone
}

function createEvent(eventInfo) {
  var name = eventInfo.name
  var date = eventInfo.dates.start.localDate
  var fullDate = parseDate(date)
  var timezone = parseTimezone(eventInfo.dates.timezone)
  var eventId = eventInfo.id
  var eventURL = eventInfo.url
  var eventName = parseName(name)
  var time = parseTime(eventInfo.dates.start.localTime)

  var event = new UpcomingEvent(eventName, fullDate, eventId, eventURL, timezone, time)
  return event
}

export default function UpcomingSchedule(props) {
  const [eventArray, setEventArray] = useState([])
  const performSearch = async () => {
    var tmEvents
    var tmEventData
    if (props.name) {
      var name = props.name
      var newname = name.replace(' ', '%20')
      var url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&keyword=${newname}&sort=date,asc&size=5&classificationName=music`
      url.replace(' ', '%20')
      tmEvents = await fetch(url)
      tmEventData = await tmEvents.json()
      var events = []
      if (tmEventData.page.totalElements > 0) {
        for (let i = 0; i < tmEventData._embedded.events.length; i++) {
          if (events.length < 5) {
            var event = createEvent(tmEventData._embedded.events[i])
            events.push(event)
          }
        }
        setEventArray(events)
      }
    }
  }
  useEffect(() => {
    performSearch()
  }, [props.name])

  return (
    <div className="container shows">
      <div className="row justify-content-center show">
        <h4 id="upcoming" className="fw-bold d-none d-sm-block">
          Upcoming Shows
        </h4>
        <h4 id="upcoming-shows" className="fw-bold d-block d-sm-none">
          Shows
        </h4>
      </div>

      {eventArray.length > 0 ? (
        <div id="upcoming-list">
          {eventArray.map((item, index) => {
            return (
              <a href={eventArray[index].eventURL} target="_blank" rel="noopener noreferrer">
                <Show
                  time={eventArray[index].eventTime}
                  date={eventArray[index].date}
                  event={eventArray[index].name}
                  location={eventArray[index].timezone}
                />
              </a>
            )
          })}
        </div>
      ) : (
        <p>No Upcoming Shows</p>
      )}

      {/* <div className="row justify-content-center pt-3">
                <button id="upcoming-btn">See more</button>
            </div> */}
    </div>
  )
}
