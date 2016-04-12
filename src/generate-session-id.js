export default function generateSessionId() {
  const time = Date.now().toString(36)
  const random = Math.floor(Math.random()) * 1000000000
  return `${time}-${random.toString(36)}`
}
