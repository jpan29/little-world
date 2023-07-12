import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: underline;

  &:hover {
    color: var(--color-brand-600);
  }
`

export default function Links({ children, to }) {
  return <StyledLink to={to}>{children}</StyledLink>
}
