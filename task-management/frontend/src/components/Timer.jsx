import { useState, useEffect } from "react"

const Timer = ({ deadlineWithDay, done }) => {
  
  const deadline = deadlineWithDay.slice(0, 10).split('-')
  const year = parseInt(deadline[0], 10)
  const month = parseInt(deadline[1], 10) - 1
  const day = parseInt(deadline[2], 10)


  const calculateTimeRemaining = () => {
    const difference = new Date(year, month, day) - new Date()
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      months: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  const [timer, setTimer] = useState(calculateTimeRemaining())

  useEffect(() => {
    const timeRemaining = setInterval(() => {
      setTimer(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(timeRemaining)
  }, [])

  if (done === 'true')
    return null
  else if (timer.seconds < 0) 
    return <div>The deadline has past!</div>

  return (
    <div>
      Time until deadline: <span className="timer">{timer.days} days, {timer.hours} hours, {timer.months} months, {timer.seconds} seconds.</span>
    </div>
  )
}

export default Timer