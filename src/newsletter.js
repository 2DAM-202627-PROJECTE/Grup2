const EMAILJS_PUBLIC_KEY = 'xqJg_Gdz2f4yexW1g'
const EMAILJS_SERVICE_ID = 'service_0vzglxe'
const EMAILJS_TEMPLATE_ID = 'template_1r4f93i'

export function newsletterState() {
  return {
    newsletterDone: false,
    newsletterSending: false,
    newsletterError: false,
    newsletterEmail: '',
    async subscribeNewsletter() {
      if (this.newsletterSending || !window.emailjs) return
      this.newsletterSending = true
      this.newsletterDone = false
      this.newsletterError = false
      try {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email: this.newsletterEmail,
          email: this.newsletterEmail,
        })
        this.newsletterDone = true
      } catch {
        this.newsletterError = true
      } finally {
        this.newsletterSending = false
      }
    },
  }
}

export function initNewsletter() {
  const emailjs = document.createElement('script')
  emailjs.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
  emailjs.onload = () => window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  document.head.append(emailjs)
}
