const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 100

const CIRCUMFERENCE_FACTOR = Math.PI * 2

/**
SVG Donut as a WebComponent

Example:

```
Basic: <nega-donut value="200" percent="90"></nega-donut>
```

@element nega-donut
@demo demo/index.html
*/
class NegaDonut extends HTMLElement {
  constructor() {
    super()

    const template = Object.assign(document.createElement('template'), {innerHTML: `
      <style>
        :host {
          display: inline-block;
          width: 60px;
          height: 60px;

          --nega-donut-color: rgb(220,41,30);
          --nega-donut-grey-color: #dedede;
          --nega-donut-stroke-width: 10;
        }

        circle {
          transform-origin: center;
          transform: rotate(-90deg) rotateX(180deg);

          stroke: var(--nega-donut-color);
          fill: transparent;
          stroke-width: var(--nega-donut-stroke-width);
        }

        circle.grey {
          transform: rotate(-90deg);
          stroke: var(--nega-donut-grey-color);
        }
      </style>

      <svg>
        <circle></circle>
        <circle class="grey"></circle>
        <text text-anchor="middle"></text>
      </svg>
    `})

    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(document.importNode(template.content, true))

    // TODO Fix resizing
    // if (window.ResizeObserver) {
    //   this._resizeObserver = new ResizeObserver(entries => this.performUpdate())
    // }

    this._ready = false
  }

  static get observedAttributes() { return ['value', 'percent'] }

  get value() { return this.getAttribute('value') }
  set value(value) { this.setAttribute('value', value) }

  get percent() { return Number(this.getAttribute('percent')) }
  set percent(value) { this.setAttribute('percent', Math.max(0, Math.min(100, isNaN(value) ? 0 : value))) }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._ready) this.performUpdate();
  }

  connectedCallback() {
    this._ready = true

    // if (this._resizeObserver) this._resizeObserver.observe(this);
    this.performUpdate()
  }

  disconnectedCallback() {
    this._ready = false
    // if (this._resizeObserver) this._resizeObserver.unobserve(this);
  }

  performUpdate() {
    const svgEl = this.shadowRoot.querySelector('svg')
    const circleElList = this.shadowRoot.querySelectorAll('circle')
    const textEl = this.shadowRoot.querySelector('text')

    const strokeWidth = Number(window.getComputedStyle(this).getPropertyValue('--nega-donut-stroke-width')) || 10
    const bounds = this.getBoundingClientRect()
    const length = Math.max(36, Math.min(bounds.width, bounds.height))
    const center = length / 2
    const radius =  center - (strokeWidth / 2)
    const percent = (Math.max(0, Math.min(100, this.percent)) / 100)

    const offset = radius * CIRCUMFERENCE_FACTOR

    svgEl.setAttribute('width', length)
    svgEl.setAttribute('height', length)
    svgEl.setAttribute('viewbox', `0 0 ${length} ${length}`)
    textEl.setAttribute('x', center)
    textEl.setAttribute('y', center + ((textEl.getBBox().height || 16) / 4))
    textEl.innerHTML = this.value

    circleElList.forEach(el => {
      el.setAttribute('cx', center)
      el.setAttribute('cy', center)
      el.setAttribute('r', radius)
      el.setAttribute('stroke-dasharray', center * CIRCUMFERENCE_FACTOR)
    })

    circleElList[0].setAttribute('stroke-dashoffset', -(offset - (offset * percent)))
    circleElList[1].setAttribute('stroke-dashoffset', -(offset * percent))
  }
}
window.customElements.define('nega-donut', NegaDonut);
