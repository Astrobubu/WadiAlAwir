'use client'

import { trackWhatsAppClick } from '../lib/analytics'

interface WATrackedLinkProps {
  href: string
  /** GA event_label describing which CTA was clicked */
  eventLabel: string
  className?: string
  children: React.ReactNode
}

/**
 * Plain wa.me link that reports a whatsapp_click to GA4.
 * Exists so Server Components can keep direct WhatsApp links
 * without becoming client components themselves.
 */
export default function WATrackedLink({
  href,
  eventLabel,
  className,
  children,
}: WATrackedLinkProps) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(eventLabel)}
    >
      {children}
    </a>
  )
}
