import { useState } from 'react'
import DataTable from '../components/DataTable'
import DisabledAction from '../components/DisabledAction'
import EmptyState from '../components/EmptyState'
import FormPanel, { FormField } from '../components/FormPanel'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import { PreviewToggle, SampleDataBanner } from '../components/PreviewControls'
import SearchInput from '../components/SearchInput'
import StatusBadge from '../components/StatusBadge'
import { sampleBooks, sampleLoans, sampleMembers } from '../data/sampleData'
import { formatDate, matchesQuery } from '../utils/format'

const STATUS = {
  on_loan: { label: 'On loan', tone: 'brand' },
  due_soon: { label: 'Due soon', tone: 'warning' },
  overdue: { label: 'Overdue', tone: 'danger' },
  returned: { label: 'Returned', tone: 'success' },
}

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Checked out' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'returned', label: 'Returned' },
]

function matchesFilter(loan, filter) {
  if (filter === 'all') return true
  if (filter === 'active') return loan.status !== 'returned'
  return loan.status === filter
}

function CheckoutForm({ showOptions, onClose }) {
  const [values, setValues] = useState({ book: '', member: '', due: '' })
  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))
  const books = showOptions ? sampleBooks.filter((b) => b.available > 0) : []
  const members = showOptions ? sampleMembers.filter((m) => m.status === 'active') : []

  return (
    <FormPanel
      title="New checkout"
      subtitle="Lend a book to a member."
      submitLabel="Check out book"
      onClose={onClose}
    >
      <FormField label="Book" id="loan-book">
        <select id="loan-book" className="input" value={values.book} onChange={update('book')}>
          <option value="">Select a book…</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Member" id="loan-member">
        <select id="loan-member" className="input" value={values.member} onChange={update('member')}>
          <option value="">Select a member…</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Due date" id="loan-due">
        <input id="loan-due" type="date" className="input" value={values.due} onChange={update('due')} />
      </FormField>
    </FormPanel>
  )
}

function LoansPage() {
  const [mode, setMode] = useState('sample')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const loans = mode === 'sample' ? sampleLoans : []
  const visible = loans.filter(
    (l) => matchesFilter(l, filter) && matchesQuery(query, l.bookTitle, l.memberName),
  )
  const countFor = (value) => loans.filter((l) => matchesFilter(l, value)).length

  const columns = [
    {
      key: 'book',
      header: 'Book',
      render: (l) => (
        <div className="cell-primary">
          <span className="cell-primary__title">{l.bookTitle}</span>
          <span className="cell-primary__sub">{l.memberName}</span>
        </div>
      ),
    },
    { key: 'checkedOut', header: 'Checked out', render: (l) => formatDate(l.checkedOut) },
    {
      key: 'due',
      header: 'Due',
      render: (l) => (
        <span className={l.status === 'overdue' ? 'text-danger' : undefined}>{formatDate(l.due)}</span>
      ),
    },
    { key: 'returned', header: 'Returned', render: (l) => formatDate(l.returned) },
    {
      key: 'status',
      header: 'Status',
      render: (l) => <StatusBadge tone={STATUS[l.status].tone}>{STATUS[l.status].label}</StatusBadge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'cell-actions',
      render: (l) =>
        l.status === 'returned' ? (
          <span className="text-muted">—</span>
        ) : (
          <DisabledAction icon="returnBox" label="Mark returned" />
        ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Loans"
        description="Book checkouts, due dates, and return status."
        actions={
          <button type="button" className="btn btn--primary" onClick={() => setCheckoutOpen(true)}>
            <Icon name="plus" size={16} />
            <span>New checkout</span>
          </button>
        }
      />

      <div className={`workspace ${checkoutOpen ? 'has-panel' : ''}`}>
        <section className="panel" aria-label="Loans">
          <div className="toolbar">
            <SearchInput
              label="Search loans"
              value={query}
              onChange={setQuery}
              placeholder="Search by book or member"
            />
            <PreviewToggle mode={mode} onChange={setMode} />
          </div>

          <div className="tabs" role="group" aria-label="Filter loans by status">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className="tabs__tab"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
                <span className="tabs__count">{countFor(f.value)}</span>
              </button>
            ))}
          </div>

          {mode === 'sample' && <SampleDataBanner />}

          {loans.length === 0 ? (
            <EmptyState
              icon="loan"
              title="No loans to show"
              message="Checkouts, due dates, and returns will appear here once the frontend is connected to the library backend."
            />
          ) : visible.length === 0 ? (
            <EmptyState
              icon="search"
              title="No matching loans"
              message="No loans match the current search and filter."
            />
          ) : (
            <>
              <DataTable columns={columns} rows={visible} caption="Loans" />
              <p className="table-footnote">
                Showing {visible.length} of {loans.length} sample loans
              </p>
            </>
          )}
        </section>

        {checkoutOpen && (
          <CheckoutForm showOptions={mode === 'sample'} onClose={() => setCheckoutOpen(false)} />
        )}
      </div>
    </>
  )
}

export default LoansPage
