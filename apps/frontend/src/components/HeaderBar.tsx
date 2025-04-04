import PeakAppLogo from '../assets/PeakAppLogo.png'
import LogoutButton from './LogoutButton'

function HeaderBar() {
  return (
    <header className="flex justify-start w-screen p-3 border-b-2 border-gray-300 bg-black text-white">
      <img src={PeakAppLogo} alt="Logo" className="h-12 mr-4" />
      <nav className="flex-1 flex justify-end items-center space-x-12">
        <a href="#" className="text-2xl font-semibold hover:underline">
          My Diary
        </a>
        <a href="#" className="text-2xl font-semibold hover:underline">
          Community
        </a>
        <LogoutButton />
      </nav>
    </header>
  )
}

export default HeaderBar
