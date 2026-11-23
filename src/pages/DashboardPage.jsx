import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import { BACKEND_CONNECTED } from '../config/backend'

// Live counts will come from the backend. Until then the dashboard shows
// placeholders rather than fabricated numbers.
const STATS = [
  { label: 'Books in catalog', icon: 'book' },
  { label: 'Registered members', icon: 'users' },
  { label: 'Active loans', icon: 'loan' },
  { label: 'Overdue loans', icon: 'info' },
]

const SECTIONS = [
  {
    to: '/books',
    icon: 'book',
    title: 'Books',
    text: 'Browse the catalog, search titles and authors, and manage book records.',
  },
  {
    to: '/members',
    icon: 'users',
    title: 'Members',
    text: 'View the member directory and manage library member details.',
  },
  {
    to: '/loans',
    icon: 'loan',
    title: 'Loans',
    text: 'Track checkouts, due dates, and return status across the library.',
  },
]

const PROGRESS = [
  { label: 'React + Vite frontend set up', done: true },
  { label: 'Interface layout designed', done: true },
  { label: 'Backend cloned and running in Docker', done: false },
  { label: 'API reviewed from openapi.json', done: false },
  { label: 'Frontend connected to the real API', done: false },
]

function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="An overview of the library's books, members, and loans."
      />

      <section className="stats" aria-label="Library summary">
        {STATS.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-card__icon">
              <Icon name={stat.icon} />
            </div>
            <div>
              <div className="stat-card__value">—</div>
              <div className="stat-card__label">{stat.label}</div>
              {!BACKEND_CONNECTED && (
                <div className="stat-card__hint">Awaiting backend</div>
              )}
            </div>
          </div>
        ))}
      </section>

      <div className="dashboard-grid">
        <section className="section-cards" aria-label="Sections">
          {SECTIONS.map((s) => (
            <Link key={s.to} to={s.to} className="section-card">
              <div className="section-card__icon">
                <Icon name={s.icon} size={22} />
              </div>
              <h2 className="section-card__title">{s.title}</h2>
              <p className="section-card__text">{s.text}</p>
              <span className="section-card__link">
                Open {s.title.toLowerCase()} <Icon name="arrowRight" size={16} />
              </span>
            </Link>
          ))}
        </section>

        <section className="panel" aria-labelledby="progress-title">
          <div className="panel__header">
            <div>
              <h2 className="panel__title" id="progress-title">
                Integration progress
              </h2>
              <p className="panel__subtitle">Frontend ↔ FastAPI backend</p>
            </div>
          </div>
          <ul className="checklist">
            {PROGRESS.map((item) => (
              <li key={item.label} className={item.done ? 'is-done' : ''}>
                <Icon name={item.done ? 'check' : 'circle'} size={16} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default DashboardPage
