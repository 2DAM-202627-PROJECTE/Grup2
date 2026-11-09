import './styles.css'

window.siteUI = () => ({
  menuOpen: false,
  openFaq: 'compte-0',
  newsletterDone: false,
  formDone: false,
  toggleFaq(id) { this.openFaq = this.openFaq === id ? null : id },
})
