import { html, css, LitElement } from 'lit';

export class AnimationSnowcss extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        overflow: hidden;
        filter: drop-shadow(0 0 10px white);
      }

      .snowflake {
        position: absolute;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
      }
    `;
  }

  static get properties() {
    return {
      stylesSnow: { type: String },
      numSnowFlakes: { type: Number }, 
      snowflakes: { type: Array }    
    };
  }

  constructor() {
    super();
    this.numSnowFlakes = 200;
    this.snowflakes = new Array(this.numSnowFlakes);
    this.snowflakes.fill('');
    this.stylesSnow = '';
  }

  firstUpdated() {
    function randomRange(min, max) {
      const rand = Math.random();
      const randomRangeVal = min + Math.floor(rand * ((max - min) + 1));
      return randomRangeVal;
    }
    this.stylesSnow = this.snowflakes.map((el, idx) => {
      const index = idx + 1;
      const randomX = `${parseInt(Math.random() * 1000000, 10) * 0.0001}`;
      const randomOffset = `${randomRange(-100000, 100000) * 0.0001}`;
      const randomXEnd = `${parseFloat(randomX) + parseFloat(randomOffset)}vw`;
      const randomXEndYoyo = `${parseFloat(randomX) + (parseFloat(randomOffset) / 2)}vw`;
      const randomYoyoTime = randomRange(30000, 80000) / 100000;
      const randomYoyoY = `${randomYoyoTime * 100}vh`;
      const randomScale = `${parseInt(Math.random() * 10000, 10) * 0.0001}`;
      const fallDuration = `${randomRange(10, 30)}s`;
      const fallDelay = `-${parseInt(Math.random() * 3000, 10)/ 100}s`;

      const output = `
        .snowflake:nth-child(${index+1}) {
          opacity: ${parseInt(Math.random() * 10000, 10) * 0.0001};
          transform: translate(${randomX}vw, -10px) scale(${randomScale});
          animation: fall-${index} ${fallDuration} ${fallDelay} linear infinite;
        }
        @keyframes fall-${index} {
          ${randomYoyoTime * 100}% {
            transform: translate(${randomXEnd}, ${randomYoyoY}) scale(${randomScale});
          }
          to {
            transform: translate(${randomXEndYoyo}, 100vh) scale(${randomScale});
          }
        }
      `;
      return html`${output}`;
    });
  }

  render() {
    return html`
      <style>${this.stylesSnow}</style>
      ${this.snowflakes.map(()=> html`<div class="snowflake"></div>`)}
    `;
  }
}
