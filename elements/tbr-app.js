import { html, render } from '/node_modules/lit-html/lit-html.js'

class TbrApp extends HTMLElement {
  constructor() {
    super()
    this.pages = []
    this.start = 0
    this.end = 100
    this.root = this.attachShadow({ mode: 'open' })
    this.render()
  }

  dateToStr(date) {
    return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  }

  template() {
    return html`
      <button @click=${this.onClick.bind(this)}>Load</button>
      <input @keyup=${this.onKeyUp.bind(this)} id="from" value=${this.start} size="4" />
      <input @keyup=${this.onKeyUp.bind(this)} id="end" value=${this.end} size="4" />
      <table>
        ${this.pages.sort((x, y) => x.updated - y.updated).slice(this.start, this.end).map(page => {
          const created = new Date(page.created * 1000)
          const updated = new Date(page.updated * 1000)
          return html`
            <tr>
              <td>${this.dateToStr(created)}</td>
              <td>${this.dateToStr(updated)}</td>
              <td><a href="#" @click=${this.copy(page.title)}>${page.title}</a></td>
            </tr>
          `
        })}
      </table>
    `
  }

  render() {
    render(this.template(), this.root)
  }

  async onClick() {
    const data = await load()
    const json = JSON.parse(data)
    this.pages = json.pages
    this.render()
  }

  onKeyUp() {
    this.start = parseInt(this.root.getElementById('from').value)
    this.end = parseInt(this.root.getElementById('end').value)
    this.render()
  }

  copy(title) {
    const that = this
    return function (event) {
      event.preventDefault()
      navigator.clipboard.writeText(`https://scrapbox.io/jgs/${title}`)
      const ptr = that.shadowRoot.querySelector('.selected')
      if (ptr) {
        ptr.style.boxShadow = ''
        ptr.setAttribute('class', '')
      }
      const tr = event.target.parentElement.parentElement
      tr.style.boxShadow = '0px -6px rgb(255, 0, 0) inset'
      tr.setAttribute('class', 'selected')
    }
  }
}

customElements.define('tbr-app', TbrApp)
