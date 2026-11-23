import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'

function NotFoundPage() {
  return (
    <div className="panel">
      <EmptyState icon="info" title="Page not found" message="That page doesn't exist.">
        <Link to="/" className="btn btn--primary">
          Back to dashboard
        </Link>
      </EmptyState>
    </div>
  )
}

export default NotFoundPage
