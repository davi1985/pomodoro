import { secondsToTime } from '../utils'

type Props = {
  finishedCycles: number
  fullWorkingTime: number
  numberOfPomodoros: number
}
export const Details = ({
  finishedCycles,
  fullWorkingTime,
  numberOfPomodoros,
}: Props) => {
  return (
    <div className="mt-5 p-5">
      <p>
        Completed Cycles:
        <span className="font-bold ml-2">{finishedCycles}</span>
      </p>
      <p>
        Total Time:
        <span className="font-bold ml-2">{secondsToTime(fullWorkingTime)}</span>
      </p>
      <p>
        Pomodoros finished:
        <span className="font-bold ml-2">{numberOfPomodoros}</span>
      </p>
    </div>
  )
}
