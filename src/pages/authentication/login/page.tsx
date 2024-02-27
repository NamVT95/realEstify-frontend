import { Link } from 'react-router-dom'
import AuthenticationLayout from '../components/AuthenticationLayout'
import { UserLoginForm } from './components/UserLoginForm'
export default function LoginPage() {
  return (
    <AuthenticationLayout>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 items-center h-full">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to Realestify
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login
              </p>
            </div>
            <UserLoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don&lsquo;t have an account? {" "}
              <Link
                to="/register"
                className="underline underline-offset-4 text-primary hover:text-primary-hover font-bold"
              >
                Register here
              </Link>
              .
            </p>
          </div>
    </AuthenticationLayout>
  )
}
