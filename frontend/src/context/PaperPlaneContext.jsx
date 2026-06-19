import { createContext, useContext, useState, useCallback } from 'react'

const PaperPlaneContext = createContext(null)

const SECTION_IDS = ['home', 'skills', 'projects', 'experience', 'contact']

export function PaperPlaneProvider({ children }) {
  const [plane, setPlane] = useState({
    phase: 'idle',
    x: -100,
    y: -100,
    angle: 0,
    sectionId: null,
  })

  const flyTo = useCallback((sectionId, fromX, fromY) => {
    setPlane({
      phase: 'flying',
      fromX,
      fromY,
      toSection: sectionId,
      x: fromX,
      y: fromY,
      angle: 0,
      sectionId: null,
    })
  }, [])

  const dock = useCallback((sectionId, x, y, angle) => {
    setPlane({
      phase: 'docked',
      sectionId,
      x,
      y,
      angle,
    })
  }, [])

  const getActiveSection = useCallback(() => {
    for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTION_IDS[i])
      if (el && el.getBoundingClientRect().top <= 200) {
        return SECTION_IDS[i]
      }
    }
    return 'home'
  }, [])

  return (
    <PaperPlaneContext.Provider value={{ plane, flyTo, dock, getActiveSection }}>
      {children}
    </PaperPlaneContext.Provider>
  )
}

export function usePaperPlane() {
  const ctx = useContext(PaperPlaneContext)
  if (!ctx) throw new Error('usePaperPlane must be inside PaperPlaneProvider')
  return ctx
}
