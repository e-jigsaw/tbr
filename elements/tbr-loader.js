class TbrLoader extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = this.template()
    this.addEventListener('click', event => console.log(event))
  }

  template() {
    return `
      <button>${this.textContent}</button>
    `
  }
}

customElements.define('tbr-loader', TbrLoader)
