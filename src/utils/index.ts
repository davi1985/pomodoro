const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0')

const hoursMinutesAndSeconds = (value: number) => {
  const hours = zeroLeft(value / 3600)
  const minutes = zeroLeft((value / 60) % 60)
  const seconds = zeroLeft((value % 60) % 60)

  return { hours, minutes, seconds }
}

export const secondsToMinutes = (value: number): string => {
  const { minutes, seconds } = hoursMinutesAndSeconds(value)

  return `${minutes}:${seconds}`
}

export const secondsToTime = (value: number): string => {
  const { hours, minutes, seconds } = hoursMinutesAndSeconds(value)

  return `${hours}:${minutes}:${seconds}`
}
