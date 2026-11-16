import './styles.css'
import { initNewsletter, newsletterState } from './newsletter.js'

window.siteUI = () => ({
  menuOpen: false,
  openFaq: null,
  formDone: false,
  ...newsletterState(),
  toggleFaq(id) { this.openFaq = this.openFaq === id ? null : id },
})

initNewsletter()

const alpine = document.createElement('script')
alpine.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js'
document.head.append(alpine)
