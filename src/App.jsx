import './App.css'

// Placeholder shell. Books, Members, and Loans features will be built
// from the backend's real openapi.json once it is available.
function App() {
  return (
    <main className="app">
      <header>
        <h1>Library Application</h1>
        <p className="subtitle">Books · Members · Loans</p>
      </header>
      <section className="status">
        <p>
          Frontend scaffold is running. Features will be connected to the
          FastAPI backend after its OpenAPI specification is reviewed.
        </p>
      </section>
    </main>
  )
}

export default App
