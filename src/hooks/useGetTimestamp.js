export default function useGetTimestamp() {
  var myDate = new Date()
  return myDate.getTime()
}