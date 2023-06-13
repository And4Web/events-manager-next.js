import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import Link from 'next/link'
// import Search from './Search'
// import AuthContext from '@/context/AuthContext'
import styles from '@/styles/Header.module.css'

export default function Header() {
  // const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/' legacyBehavior>
          <a>DJ Events</a>
        </Link>
      </div>

      {/* <Search /> */}

      <nav>
        <ul>
          <li>
            <Link to='/events' legacyBehavior>
              <a >Events</a>
            </Link>
          </li>
         
        </ul>
      </nav>
    </header>
  )
}
