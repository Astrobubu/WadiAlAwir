let lockCount = 0

export function lockScroll(): void {
  if (lockCount === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingInlineEnd = `${scrollbarWidth}px`
    const navbar = document.getElementById('navbar')
    if (navbar) navbar.style.paddingInlineEnd = `${scrollbarWidth}px`
  }
  lockCount++
}

export function unlockScroll(): void {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = ''
    document.body.style.paddingInlineEnd = ''
    const navbar = document.getElementById('navbar')
    if (navbar) navbar.style.paddingInlineEnd = ''
  }
}
