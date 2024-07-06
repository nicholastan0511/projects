import PomodoroIcon from '../../assets/food.png'
import { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { addPomodoroCount } from '../../reducers/todoReducer';
import { useDispatch } from 'react-redux';
import audio from '../../assets/morning_flower.mp3'

const btnStyle = { 
  backgroundColor: '#555555',
  color: 'white'
}

const shortBreakStyle = {
  backgroundColor: "rgb(56, 133, 138)"
}

const longBreakStyle = {
  backgroundColor: "rgb(57, 112, 151)"
}

const notifyUser = () => {
  const alarmSound = new Audio(audio);
  console.log(alarmSound)
  alarmSound.play();

  // Check if the browser supports notifications
  if ('Notification' in window) {
    // Ask for permission
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        // Create a new notification
        new Notification('Alarm Notice', {
          body: 'Your pomodoro session is up! Time for a break!'
        });
      }
    });
  } else {
    alert('Your browser does not support notifications.');
  }
}

const PomodoroPage   = () => {
  const [countdown, setCountdown] = useState(25*60)
  const [start, setStart] = useState(false)
  const [selected, setSelected] = useState(null)
  const [menu, setMenu] = useState({ title: 'POMODORO', countdown: 25*60 })

  const dispatch = useDispatch()

  const todos = useSelector(state => state.todos)
  const undone = todos.filter(todo => todo.done === 'false')

  useEffect(() => {
    // Function to update the countdown display
    const updateCountdown = (timerID) => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(timerID);
          notifyUser()
          setTimeout(() => {           
            restartCountdown(menu.countdown)
            // if there is a task selected

          }, 10000)
          if (selected && menu.title === 'POMODORO')
            dispatch(addPomodoroCount({ ...selected, pomodoro: selected.pomodoro ? selected.pomodoro + 1 : 1 }))
        } else {
          return prevCountdown - 1;
        }
      });
    };

    // Start the countdown
    let timerID

    if (start) {
      timerID = setInterval(updateCountdown, 1000); // Update every second
    }
  
    // Cleanup the interval on component unmount
    return () => clearInterval(timerID);
  }, [start]); // Empty dependency array to run once on mount

  // Convert seconds to minutes and seconds format
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const startCountdown = (e) => {
    e.preventDefault()
    setStart(true)
  }

  const pauseCountdown = (e) => {
    e.preventDefault()
    setStart(false)
  }

  const restartCountdown = (countdown) => {
    // e.preventDefault()
    if (start)
      setStart(false)
    setCountdown(countdown)
  }

  const handleSelect = (todo) => {
    setSelected(todo)
  }

  const handleChangeMenu = (menu) => {
    setMenu(menu)
    setCountdown(menu.countdown)
    restartCountdown(menu.countdown)
  }

  return (
    <div className="pomoPage">
      <div className='welcome-hero-pomodoro'>
        <h1>Pomodoro</h1>
        <p className='quote-pomodoro'>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. This technique aims to enhance focus and productivity by encouraging sustained concentration and frequent rest.</p>
      </div>
      <div className="pomoContainer" style={ 
        menu.title === 'SHORT_BREAK'
          ? shortBreakStyle
          : menu.title === 'LONG_BREAK'
          ? longBreakStyle
          : null
       }>
        <div className='menu-pomo'>
          <button style={ menu.title === 'POMODORO' ? btnStyle : { backgroundColor: menu.backgroundColor } } onClick={() => handleChangeMenu({ title: "POMODORO", countdown: 25*60 })}>Pomodoro</button>
          <button style={ menu.title === 'SHORT_BREAK' ? btnStyle : { backgroundColor: menu.backgroundColor } } onClick={() => handleChangeMenu({ title: "SHORT_BREAK", countdown: 5*60, backgroundColor: "rgb(56, 133, 138)" })}>Short break</button>
          <button style={ menu.title === 'LONG_BREAK' ? btnStyle : { backgroundColor: menu.backgroundColor } } onClick={() => handleChangeMenu({ title: "LONG_BREAK", countdown: 10*60, backgroundColor: "rgb(57, 112, 151)" })}>Long break</button>
        </div>

        <div className='pomoSmallContainer'>
          <div className="pomoPicContainer">
            <img src={PomodoroIcon} alt="Tomato" className='pomoPic' />
          </div>
          <p className='clock-pomo'>{minutes < 10 ? `0${minutes}` : !minutes ? '00' : minutes } : {seconds < 10 ? `0${seconds}` : !seconds ? '00' : seconds }</p>
          <div className='pomo-btn-group'>
            <Button variant='primary' onClick={ start ? pauseCountdown : startCountdown }>{ start ? 'Pause' : 'Start' }</Button>
            <Button variant='secondary' onClick={() => restartCountdown(menu.countdown)}>RESTART</Button>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selected ? selected.title : 'Select a task' }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {undone.map(todo => {
                return <Dropdown.Item key={todo.id} onClick={ () => handleSelect(todo) }>{todo.title}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default PomodoroPage;