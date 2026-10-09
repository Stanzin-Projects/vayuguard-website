import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <div className="text-7xl font-extrabold text-flame-600">404</div>
        <h1 className="mt-4 text-3xl font-extrabold">This page ran out of fresh air</h1>
        <p className="mt-3 text-ink-500">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn-primary mt-8">Back to Home</Link>
      </div>
    </section>
  )
}
