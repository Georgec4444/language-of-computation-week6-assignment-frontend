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
import { sampleBooks } from '../data/sampleData'
import { formatYear, matchesQuery } from '../utils/format'

const EMPTY_BOOK = { title: '', author: '', isbn: '', year: '' }

function BookForm({ book, onClose }) {
  const [values, setValues] = useState(book ? { ...EMPTY_BOOK, ...book } : EMPTY_BOOK)
  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  return (
    <FormPanel
      title={book ? 'Edit book' : 'Add a book'}
      subtitle={book ? book.title : 'Enter the details for a new catalog record.'}
      submitLabel={book ? 'Save changes' : 'Add book'}
      onClose={onClose}
    >
      <FormField label="Title" id="book-title">
        <input id="book-title" className="input" value={values.title} onChange={update('title')} />
      </FormField>
      <FormField label="Author" id="book-author">
        <input id="book-author" className="input" value={values.author} onChange={update('author')} />
      </FormField>
      <FormField label="ISBN" id="book-isbn" hint="ISBN-10 or ISBN-13">
        <input id="book-isbn" className="input input--mono" value={values.isbn} onChange={update('isbn')} inputMode="numeric" />
      </FormField>
      <FormField label="Publication year" id="book-year">
        <input id="book-year" className="input" value={values.year} onChange={update('year')} inputMode="numeric" />
      </FormField>
    </FormPanel>
  )
}

function BooksPage() {
  const [mode, setMode] = useState('sample')
  const [query, setQuery] = useState('')
  // null = form closed, 'new' = add form, otherwise the book being edited
  const [editing, setEditing] = useState(null)

  const books = mode === 'sample' ? sampleBooks : []
  const visible = books.filter((b) => matchesQuery(query, b.title, b.author, b.isbn))

  const columns = [
    {
      key: 'title',
      header: 'Title',
      className: 'cell-wrap',
      render: (b) => (
        <div className="cell-primary">
          <span className="cell-primary__title">{b.title}</span>
          <span className="cell-primary__sub">{b.author}</span>
        </div>
      ),
    },
    { key: 'isbn', header: 'ISBN', className: 'mono cell-compact' },
    { key: 'year', header: 'Year', className: 'cell-compact', render: (b) => formatYear(b.year) },
    {
      key: 'availability',
      header: 'Availability',
      className: 'cell-compact',
      render: (b) =>
        b.available > 0 ? (
          <StatusBadge tone="success">
            {b.available} of {b.total} available
          </StatusBadge>
        ) : (
          <StatusBadge tone="neutral">All on loan</StatusBadge>
        ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'cell-actions',
      render: (b) => (
        <div className="row-actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setEditing(b)}>
            <Icon name="edit" size={16} />
            <span>Edit</span>
          </button>
          <DisabledAction icon="trash" label="Delete" />
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Books"
        description="Search the catalog and manage book records."
        actions={
          <button type="button" className="btn btn--primary" onClick={() => setEditing('new')}>
            <Icon name="plus" size={16} />
            <span>Add book</span>
          </button>
        }
      />

      <div className={`workspace ${editing ? 'has-panel' : ''}`}>
        <section className="panel" aria-label="Book catalog">
          <div className="toolbar">
            <SearchInput
              label="Search books"
              value={query}
              onChange={setQuery}
              placeholder="Search by title, author, or ISBN"
            />
            <PreviewToggle mode={mode} onChange={setMode} />
          </div>

          {mode === 'sample' && <SampleDataBanner />}

          {books.length === 0 ? (
            <EmptyState
              icon="book"
              title="No books to show"
              message="The catalog will appear here once the frontend is connected to the library backend."
            />
          ) : visible.length === 0 ? (
            <EmptyState
              icon="search"
              title="No matching books"
              message={`Nothing matches “${query}”. Try a different title, author, or ISBN.`}
            />
          ) : (
            <>
              <DataTable columns={columns} rows={visible} caption="Book catalog" />
              <p className="table-footnote">
                Showing {visible.length} of {books.length} sample books
              </p>
            </>
          )}
        </section>

        {editing && (
          <BookForm
            key={editing === 'new' ? 'new' : editing.id}
            book={editing === 'new' ? null : editing}
            onClose={() => setEditing(null)}
          />
        )}
      </div>
    </>
  )
}

export default BooksPage
