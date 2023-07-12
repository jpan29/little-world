import Heading from '../ui/Heading'
import SignupForm from '../features/authentication/SignupForm'
import Logo from '../ui/Logo'
import { styled } from 'styled-components'

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`
function NewUsers() {
  return (
    <SignupLayout>
      <Logo />
      <Heading as="h4">Create a new user</Heading>
      <SignupForm />
    </SignupLayout>
  )
}

export default NewUsers
