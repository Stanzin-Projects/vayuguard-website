import { useEffect, useState } from 'react'

/* ── Tiny cross-page store so Contact can prefill the enquiry ──
   "Get a Quote" on a product page drops the product name here before
   navigating, and the Contact form picks it up — no router-state
   plumbing needed on every page. */
let pendingProduct = null
const listeners = new Set()

export function setPendingProduct(name) {
  pendingProduct = name || null
  listeners.forEach((fn) => fn(pendingProduct))
}
export function usePendingProduct() {
  const [val, setVal] = useState(pendingProduct)
  useEffect(() => {
    listeners.add(setVal)
    return () => listeners.delete(setVal)
  }, [])
  return [val, setPendingProduct]
}
