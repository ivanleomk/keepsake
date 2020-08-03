
export default function usePrevious (value) {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}
