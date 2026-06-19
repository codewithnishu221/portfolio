const planeSVG = `<svg viewBox="0 0 60 40" width="38" height="28">
  <defs>
    <linearGradient id="wingT" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="wingB" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
  </defs>
  <polygon points="55,20 40,2 20,20" fill="url(#wingT)" stroke="#4f46e5" stroke-width="0.4"/>
  <polygon points="55,20 40,38 20,20" fill="url(#wingB)" stroke="#4f46e5" stroke-width="0.4"/>
  <polygon points="20,20 8,12 8,28" fill="#6366f1" stroke="#4f46e5" stroke-width="0.4"/>
  <polygon points="12,12 18,20 12,28" fill="#818cf8" opacity="0.35"/>
  <line x1="55" y1="20" x2="8" y2="20" stroke="#4f46e5" stroke-width="0.4" opacity="0.2"/>
</svg>`

export function flyTo(sectionId, clickX, clickY, targetSelector) {
  const target = document.getElementById(sectionId)
  if (!target) return

  let endX, endY
  let targetEl = null
  if (targetSelector) {
    targetEl = target.querySelector(targetSelector)
    if (targetEl) {
      const r = targetEl.getBoundingClientRect()
      endX = r.left + r.width / 2
      endY = r.top + r.height / 2
    } else {
      const r = target.getBoundingClientRect()
      endX = r.left + r.width / 2
      endY = r.top + r.height / 2
    }
  } else {
    const r = target.getBoundingClientRect()
    endX = r.left + r.width / 2
    endY = r.top + r.height / 2
  }

  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;'
  document.body.appendChild(container)

  const planeEl = document.createElement('div')
  planeEl.innerHTML = planeSVG
  planeEl.style.cssText = `
    position: absolute;
    left: ${clickX}px;
    top: ${clickY}px;
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 1;
    transition: none;
    filter: drop-shadow(0 0 8px rgba(99,102,241,0.35));
  `
  container.appendChild(planeEl)

  const trail = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  trail.setAttribute('width', '100%')
  trail.setAttribute('height', '100%')
  trail.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;'
  container.appendChild(trail)

  const startX = clickX
  const startY = clickY
  const dx = endX - startX
  const dy = endY - startY
  const dist = Math.sqrt(dx * dx + dy * dy)
  const arcHeight = Math.max(200, dist * 0.35)
  const cp1x = startX + dx * 0.2
  const cp1y = startY - arcHeight
  const cp2x = startX + dx * 0.8
  const cp2y = endY - arcHeight
  const duration = Math.min(1200, Math.max(600, dist * 0.7))
  const startTime = performance.now()
  const trailPositions = []

  const animate = (now) => {
    const t = Math.min((now - startTime) / duration, 1)
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    const u = 1 - ease
    const uu = u * u
    const uuu = uu * u
    const tt = ease * ease
    const ttt = tt * ease

    const x = uuu * startX + 3 * uu * ease * cp1x + 3 * u * tt * cp2x + ttt * endX
    const y = uuu * startY + 3 * uu * ease * cp1y + 3 * u * tt * cp2y + ttt * endY

    const derivX = 3 * uu * (cp1x - startX) + 6 * u * ease * (cp2x - cp1x) + 3 * tt * (endX - cp2x)
    const derivY = 3 * uu * (cp1y - startY) + 6 * u * ease * (cp2y - cp1y) + 3 * tt * (endY - cp2y)
    const angle = Math.atan2(derivY, derivX) * (180 / Math.PI)

    planeEl.style.left = `${x}px`
    planeEl.style.top = `${y}px`
    planeEl.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`

    const fadeStart = 0.82
    if (t > fadeStart) {
      const fadeT = (t - fadeStart) / (1 - fadeStart)
      const scale = 1 - fadeT * 0.6
      const opacity = 1 - fadeT
      planeEl.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`
      planeEl.style.opacity = opacity
    }

    trailPositions.push({ x, y })
    if (trailPositions.length > 35) trailPositions.shift()

    let pathD = ''
    for (let i = 0; i < trailPositions.length; i++) {
      if (i === 0) pathD += `M ${trailPositions[i].x} ${trailPositions[i].y}`
      else pathD += ` L ${trailPositions[i].x} ${trailPositions[i].y}`
    }

    let trailAlpha = Math.min(1, trailPositions.length / 35) * 0.35
    if (t > fadeStart) trailAlpha *= (1 - (t - fadeStart) / (1 - fadeStart))
    trail.innerHTML = trailPositions.length > 1
      ? `<path d="${pathD}" stroke="rgba(129,140,248,${trailAlpha})" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      : ''

    if (t < 1) {
      requestAnimationFrame(animate)
    } else {
      trail.innerHTML = ''
      container.remove()

      if (targetEl) {
        const icon = targetEl.querySelector('.submit-plane-icon')
        if (icon) {
          icon.style.transition = 'all 0.4s ease'
          icon.style.opacity = '1'
          icon.style.transform = 'scale(1)'
          icon.style.filter = 'drop-shadow(0 0 8px rgba(99,102,241,0.5))'
          setTimeout(() => {
            icon.style.filter = 'none'
          }, 600)
        }
        targetEl.style.transition = 'box-shadow 0.3s ease'
        targetEl.style.boxShadow = '0 0 20px rgba(99,102,241,0.3)'
        setTimeout(() => {
          targetEl.style.boxShadow = ''
        }, 800)
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  requestAnimationFrame(animate)
}
