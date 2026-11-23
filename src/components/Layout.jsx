import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import BackendStatus from './BackendStatus'
import Icon from './Icon'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/books', label: 'Books', icon: 'book' },
  { to: '/members', label: 'Members', icon: 'users' },
  { to: '/loans', label: 'Loans', icon: 'loan' },
]

function Layout() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className={`shell ${navOpen ? 'nav-open' : ''}`}>
      <aside className="sidebar" id="primary-nav">
        <div className="brand">
          <div className="brand__mark" aria-hidden="true">
            <Icon name="book" size={20} />
          </div>
          <div>
            <div className="brand__name">Library</div>
            <div className="brand__sub">MSAI-5523 · Module 6</div>
          </div>
        </div>

        <nav aria-label="Main">
          <ul className="nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className="nav__link"
                  onClick={() => setNavOpen(false)}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <p>Frontend preview</p>
          <p className="sidebar__footer-muted">React + Vite</p>
        </div>
      </aside>

      <button
        type="button"
        className="scrim"
        aria-label="Close navigation"
        tabIndex={-1}
        onClick={() => setNavOpen(false)}
      />

      <div className="main">
        <header className="topbar">
          <button
            type="button"
            className="icon-btn topbar__menu"
            aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            onClick={() => setNavOpen((open) => !open)}
          >
            <Icon name={navOpen ? 'close' : 'menu'} size={20} />
          </button>
          <span className="topbar__title">Library Application</span>
          <BackendStatus />
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
