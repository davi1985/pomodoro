import { PomodoroTimer } from './components/PomodoroTimer'

export const App = () => (
  <div className="flex items-center justify-center h-screen max-w-md m-auto">
    <PomodoroTimer
      pomodoroTime={1500}
      shortRestTime={300}
      longRestTime={900}
      cycles={4}
    />
  </div>
)
