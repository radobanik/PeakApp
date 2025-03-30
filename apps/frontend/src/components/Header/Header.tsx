import './Header.css'
import PeakAppLogo from '../../assets/PeakAppLogo.png'

function Header() {
    return(
        <header className="Header--Header">
            <img src={PeakAppLogo} alt="Logo" className="Header--Logo" />
            <nav className="Header--Nav">
                <a href="#" className="Header--Entry">My Diary</a>
                <a href="#" className="Header--Entry">Community</a>
            </nav>
        </header>
    )
}

export default Header;