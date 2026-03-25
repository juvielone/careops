import type { ReactNode } from "react"
import { Link as RouterLink } from "react-router-dom"

type Href = string | { pathname: string }

type NextLinkProps = {
  href: Href
  children?: ReactNode
} & Omit<React.ComponentProps<typeof RouterLink>, "to">

export default function NextLink({ href, children, ...rest }: NextLinkProps) {
  const to = typeof href === "string" ? href : href.pathname

  return (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  )
}

