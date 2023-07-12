import { useEffect, useRef } from "react"

export function useOutsideClick (handler, hanldeCapturing = true) {
  const ref = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler()
    }
    document.addEventListener('click', handleClick, hanldeCapturing)
    return () => document.removeEventListener('click', handleClick, hanldeCapturing)
  }, [handler, hanldeCapturing])
  return { ref }
}