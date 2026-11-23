import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import BooksPage from './pages/BooksPage'
import DashboardPage from './pages/DashboardPage'
import LoansPage from './pages/LoansPage'
import MembersPage from './pages/MembersPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="loans" element={<LoansPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
