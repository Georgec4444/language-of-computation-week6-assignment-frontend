import { useState } from 'react'
import DisabledAction from '../components/DisabledAction'
import EmptyState from '../components/EmptyState'
import FormPanel, { FormField } from '../components/FormPanel'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import { PreviewToggle, SampleDataBanner } from '../components/PreviewControls'
import SearchInput from '../components/SearchInput'
import StatusBadge from '../components/StatusBadge'
import { sampleMembers } from '../data/sampleData'
import { formatDate, initials, matchesQuery } from '../utils/format'

const EMPTY_MEMBER = { name: '', email: '' }

function MemberForm({ member, onClose }) {
  const [values, setValues] = useState(member ? { ...EMPTY_MEMBER, ...member } : EMPTY_MEMBER)
  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  return (
    <FormPanel
      title={member ? 'Edit member' : 'Add a member'}
      subtitle={member ? member.name : 'Register a new library member.'}
      submitLabel={member ? 'Save changes' : 'Add member'}
      onClose={onClose}
    >
      <FormField label="Full name" id="member-name">
        <input id="member-name" className="input" value={values.name} onChange={update('name')} />
      </FormField>
      <FormField label="Email" id="member-email">
        <input id="member-email" type="email" className="input" value={values.email} onChange={update('email')} />
      </FormField>
    </FormPanel>
  )
}

function MemberCard({ member, onEdit }) {
  const active = member.status === 'active'
  return (
    <article className="member-card">
      <div className="member-card__top">
        <div className="avatar" aria-hidden="true">
          {initials(member.name)}
        </div>
        <div className="member-card__identity">
          <h3 className="member-card__name">{member.name}</h3>
          {/* Truncated visually; the full address is in the DOM for screen
              readers and shown in a tooltip on hover or keyboard focus. */}
          <div className="member-card__email-wrap" tabIndex={0}>
            <p className="member-card__email">{member.email}</p>
            <span className="member-card__email-tip" aria-hidden="true">
              {member.email}
            </span>
          </div>
        </div>
        <StatusBadge tone={active ? 'success' : 'neutral'}>
          {active ? 'Active' : 'Inactive'}
        </StatusBadge>
      </div>

      <dl className="member-card__meta">
        <div>
          <dt>Member since</dt>
          <dd>{formatDate(member.memberSince)}</dd>
        </div>
        <div>
          <dt>Active loans</dt>
          <dd>{member.activeLoans}</dd>
        </div>
      </dl>

      <div className="member-card__actions">
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => onEdit(member)}>
          <Icon name="edit" size={16} />
          <span>Edit</span>
        </button>
        <DisabledAction icon="trash" label="Remove" />
      </div>
    </article>
  )
}

function MembersPage() {
  const [mode, setMode] = useState('sample')
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)

  const members = mode === 'sample' ? sampleMembers : []
  const visible = members.filter((m) => matchesQuery(query, m.name, m.email))

  return (
    <>
      <PageHeader
        title="Members"
        description="The library member directory."
        actions={
          <button type="button" className="btn btn--primary" onClick={() => setEditing('new')}>
            <Icon name="plus" size={16} />
            <span>Add member</span>
          </button>
        }
      />

      <div className={`workspace ${editing ? 'has-panel' : ''}`}>
        <section className="panel" aria-label="Member directory">
          <div className="toolbar">
            <SearchInput
              label="Search members"
              value={query}
              onChange={setQuery}
              placeholder="Search by name or email"
            />
            <PreviewToggle mode={mode} onChange={setMode} />
          </div>

          {mode === 'sample' && <SampleDataBanner />}

          {members.length === 0 ? (
            <EmptyState
              icon="users"
              title="No members to show"
              message="The member directory will appear here once the frontend is connected to the library backend."
            />
          ) : visible.length === 0 ? (
            <EmptyState
              icon="search"
              title="No matching members"
              message={`Nothing matches “${query}”. Try a different name or email.`}
            />
          ) : (
            <>
              <div className="member-grid">
                {visible.map((m) => (
                  <MemberCard key={m.id} member={m} onEdit={setEditing} />
                ))}
              </div>
              <p className="table-footnote">
                Showing {visible.length} of {members.length} sample members
              </p>
            </>
          )}
        </section>

        {editing && (
          <MemberForm
            key={editing === 'new' ? 'new' : editing.id}
            member={editing === 'new' ? null : editing}
            onClose={() => setEditing(null)}
          />
        )}
      </div>
    </>
  )
}

export default MembersPage
