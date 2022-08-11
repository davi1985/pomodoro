import { secondsToMinutes } from '../utils'

export const Timer = ({ mainTime }: { mainTime: number }) => (
  <div className="text-8xl text-center mt-4 font-light">
    {secondsToMinutes(mainTime)}
  </div>
)
