import { useEffect, useRef } from 'react'

export const useInterval = <C extends CallableFunction>(
  callback: C,
  delay: number | null,
): void => {
  const saveCallback = useRef<C>()

  useEffect(() => {
    saveCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => saveCallback.current && saveCallback.current()

    if (delay !== null) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}
