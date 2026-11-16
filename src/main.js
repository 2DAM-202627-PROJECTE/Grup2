import './styles.css'

window.siteUI = () => ({
  menuOpen: false,
  openFaq: null,
  newsletterDone: false,
  formDone: false,
  toggleFaq(id) { this.openFaq = this.openFaq === id ? null : id },
})

const alpine = document.createElement('script')
alpine.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js'
document.head.append(alpine)
