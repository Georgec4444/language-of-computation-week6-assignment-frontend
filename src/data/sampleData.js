// ---------------------------------------------------------------------------
// STATIC SAMPLE DATA — FOR VISUAL PREVIEW ONLY
//
// This data is NOT from the backend and is NOT a proposed database schema.
// Field names here are display placeholders. Once the backend's openapi.json
// is available, pages will be updated to use the real field names and this
// file will be removed.
// ---------------------------------------------------------------------------

export const sampleBooks = [
  { id: 'b1', title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', year: 1813, available: 2, total: 3 },
  { id: 'b2', title: 'Moby-Dick', author: 'Herman Melville', isbn: '9780142437247', year: 1851, available: 1, total: 1 },
  { id: 'b3', title: 'Frankenstein', author: 'Mary Shelley', isbn: '9780141439471', year: 1818, available: 0, total: 2 },
  { id: 'b4', title: 'The Adventures of Huckleberry Finn', author: 'Mark Twain', isbn: '9780143107323', year: 1884, available: 1, total: 2 },
  { id: 'b5', title: 'Great Expectations', author: 'Charles Dickens', isbn: '9780141439563', year: 1861, available: 0, total: 1 },
  { id: 'b6', title: 'Jane Eyre', author: 'Charlotte Brontë', isbn: '9780141441146', year: 1847, available: 2, total: 2 },
  { id: 'b7', title: 'The Odyssey', author: 'Homer', isbn: '9780140268867', year: -700, available: 3, total: 3 },
  { id: 'b8', title: 'Little Women', author: 'Louisa May Alcott', isbn: '9780147514011', year: 1868, available: 1, total: 2 },
]

export const sampleMembers = [
  { id: 'm1', name: 'Jordan Ellis', email: 'jordan.ellis@example.edu', memberSince: '2024-08-19', activeLoans: 2, status: 'active' },
  { id: 'm2', name: 'Priya Raman', email: 'priya.raman@example.edu', memberSince: '2023-01-09', activeLoans: 1, status: 'active' },
  { id: 'm3', name: 'Marcus Webb', email: 'marcus.webb@example.edu', memberSince: '2025-02-14', activeLoans: 1, status: 'active' },
  { id: 'm4', name: 'Elena Torres', email: 'elena.torres@example.edu', memberSince: '2022-09-01', activeLoans: 0, status: 'inactive' },
  { id: 'm5', name: 'Samuel Okafor', email: 'samuel.okafor@example.edu', memberSince: '2025-08-25', activeLoans: 1, status: 'active' },
  { id: 'm6', name: 'Hannah Lee', email: 'hannah.lee@example.edu', memberSince: '2024-01-16', activeLoans: 0, status: 'active' },
]

// status values: 'on_loan' | 'due_soon' | 'overdue' | 'returned'
export const sampleLoans = [
  { id: 'l1', bookTitle: 'Frankenstein', memberName: 'Jordan Ellis', checkedOut: '2026-11-02', due: '2026-11-16', returned: null, status: 'overdue' },
  { id: 'l2', bookTitle: 'Great Expectations', memberName: 'Priya Raman', checkedOut: '2026-11-10', due: '2026-11-24', returned: null, status: 'due_soon' },
  { id: 'l3', bookTitle: 'Pride and Prejudice', memberName: 'Marcus Webb', checkedOut: '2026-11-18', due: '2026-12-02', returned: null, status: 'on_loan' },
  { id: 'l4', bookTitle: 'Frankenstein', memberName: 'Samuel Okafor', checkedOut: '2026-11-20', due: '2026-12-04', returned: null, status: 'on_loan' },
  { id: 'l5', bookTitle: 'Moby-Dick', memberName: 'Hannah Lee', checkedOut: '2026-10-21', due: '2026-11-04', returned: '2026-11-03', status: 'returned' },
  { id: 'l6', bookTitle: 'Little Women', memberName: 'Jordan Ellis', checkedOut: '2026-11-12', due: '2026-11-26', returned: null, status: 'due_soon' },
  { id: 'l7', bookTitle: 'Jane Eyre', memberName: 'Elena Torres', checkedOut: '2026-09-30', due: '2026-10-14', returned: '2026-10-12', status: 'returned' },
]
