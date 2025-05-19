import { LoginForm } from '@/components/LoginForm'
import PeakAppLogo from '../assets/PeakAppLogo.png'

export default function LoginPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-accent px-4">
      <div className="w-full max-w-lg">
        <img src={PeakAppLogo} alt="Logo" className="h-16 mx-auto mb-6" />
        <LoginForm className="w-full" />
      </div>
    </div>
  )
}
