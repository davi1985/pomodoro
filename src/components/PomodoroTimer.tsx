import { useCallback, useEffect, useState } from 'react'
import { useInterval } from '../hooks/useInterval'
import { Controls } from './Controls'
import { Details } from './Details'
import { Timer } from './Timer'

import start from '../sounds/start.mp3'
import finish from '../sounds/finish.mp3'

const audioStartWorking = new Audio(start)
const audioStopWorking = new Audio(finish)

type Props = {
  pomodoroTime: number
  shortRestTime: number
  longRestTime: number
  cycles: number
}

export const PomodoroTimer = ({
  pomodoroTime,
  longRestTime,
  shortRestTime,
  cycles,
}: Props) => {
  const [mainTime, setMainTime] = useState(pomodoroTime)
  const [timeCounting, setTimeCounting] = useState<boolean>(false)
  const [working, setWorking] = useState<boolean>(false)
  const [resting, setResting] = useState<boolean>(false)

  const initialCycleState = new Array(cycles - 1).fill(true)

  const [allCycles, setAllCycles] = useState(initialCycleState)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [fullWorkingTime, setFullWorkingTime] = useState(0)
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0)

  useInterval(
    () => {
      setMainTime(mainTime - 1)
      if (working) setFullWorkingTime(fullWorkingTime + 1)
    },
    timeCounting ? 1000 : null,
  )

  const startWork = useCallback(() => {
    setTimeCounting(true)
    setWorking(true)
    setMainTime(pomodoroTime)
    audioStartWorking.play()
  }, [pomodoroTime])

  const pauseWork = () => {
    setTimeCounting(!timeCounting)
  }

  const restWork = useCallback(
    (long: boolean) => {
      setTimeCounting(false)
      setWorking(false)
      setResting(true)

      if (long) {
        setMainTime(longRestTime)
      } else {
        setMainTime(shortRestTime)
      }

      audioStopWorking.play()
    },
    [longRestTime, shortRestTime],
  )

  useEffect(() => {
    if (mainTime > 0) return

    if (working && allCycles.length > 0) {
      restWork(false)
      allCycles.pop()
    } else if (working && allCycles.length <= 0) {
      restWork(true)
      setAllCycles(initialCycleState)
      setCompletedCycles(completedCycles + 1)
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1)
    if (resting) startWork()
  }, [
    working,
    resting,
    mainTime,
    allCycles,
    numberOfPomodoros,
    startWork,
    restWork,
    initialCycleState,
    completedCycles,
  ])

  return (
    <div
      className={`${
        working ? 'bg-orange-400 text-gray-50' : 'bg-gray-300 text-gray-900'
      } max-w-2xl w-full text-gray-900 p-5 rounded-md shadow`}
    >
      <h1 className="text-2xl text-center font-semibold">
        You are:
        <span className="uppercase ml-2">
          {working ? 'Working' : 'Resting'}
        </span>
      </h1>

      <Timer mainTime={mainTime} />

      <Controls
        restWork={() => restWork(false)}
        startWork={startWork}
        pauseWork={pauseWork}
        timeCounting={timeCounting}
        resting={resting}
        working={working}
      />

      <Details
        finishedCycles={completedCycles}
        fullWorkingTime={fullWorkingTime}
        numberOfPomodoros={numberOfPomodoros}
      />
    </div>
  )
}
