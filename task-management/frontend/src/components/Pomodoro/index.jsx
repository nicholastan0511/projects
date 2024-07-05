import PomodoroIcon from '../../assets/food.png'
import { useState, useEffect } from 'react';

const PomodoroPage   = () => {
  const [countdown, setCountdown] = useState(25*60)

  useEffect(() => {
    // Function to update the countdown display
    const updateCountdown = () => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(timerID);
          return 0;
        } else {
          return prevCountdown - 1;
        }
      });
    };

    // Start the countdown
    const timerID = setInterval(updateCountdown, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(timerID);
  }, []); // Empty dependency array to run once on mount

  // Convert seconds to minutes and seconds format
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;


  return (
    <div className="pomoPage">
      <div className="pomoPicContainer">
        <img src={PomodoroIcon} alt="Tomato" className='pomoPic' />
      </div>
      <div>
        <p>{minutes} mins {seconds} seconds</p>
      </div>

    </div>
  )
}

export default PomodoroPage;