import { Link } from 'react-router-dom'
import AuthenticationLayout from '../components/AuthenticationLayout'
import UserRegisterForm from './UserRegisterForm'

export default function Register() {
  return (
    <AuthenticationLayout>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 items-center h-full">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Are you new? Welcome to Realestify
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to register
              </p>
            </div>
            <UserRegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Already have an account? {" "}
              <Link
                to="/login"
                className="underline underline-offset-4 text-primary hover:text-primary-hover font-bold"
              >
                Login here
              </Link>
              .
            </p>
          </div>
    </AuthenticationLayout>
  )
}
