import Link from 'next/link'
import type { ComponentProps } from 'react'

export default function AdminLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={true} {...props} />
}
