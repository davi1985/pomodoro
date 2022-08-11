import { Button } from './Button'

type Props = {
  startWork: () => void
  pauseWork: () => void
  restWork: () => void
  timeCounting: boolean
  resting: boolean
  working: boolean
}

export const Controls = ({
  startWork,
  pauseWork,
  timeCounting,
  restWork,
  resting,
  working,
}: Props) => {
  return (
    <div className="flex justify-around items-center mt-5">
      <Button
        onClick={startWork}
        text={'Work'}
        className={
          'btn bg-green-700 py-3 px-6 rounded text-white w-1/4 mt-3 transition-colors ease-out duration-300'
        }
      />

      <Button
        onClick={restWork}
        text={'Rest'}
        className={
          !working && !resting
            ? 'hidden'
            : 'btn  bg-green-700 py-3 px-6 rounded text-white w-1/4 mt-3 transition-colors ease-out duration-300'
        }
      />

      <Button
        onClick={pauseWork}
        text={timeCounting ? 'Pause' : 'Play'}
        className={
          'btn bg-green-700 py-3 px-6 rounded text-white w-1/4 mt-3 transition-colors ease-out duration-300'
        }
      />
    </div>
  )
}
