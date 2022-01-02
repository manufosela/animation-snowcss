import { html, css, LitElement } from 'lit';

export class AnimationSnowcss extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        background: var(--animation-snowcss-background-color, radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%));
        overflow: hidden;
        filter: drop-shadow(0 0 10px white);
        z-index:-1;
        position:fixed;
        top: 0;
        left:0;
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
      numSnowFlakes: { type: Number, attribute: 'num-snowflakes' }, 
      speed: { type: Number },
      stylesSnow: { type: String },
      snowflakes: { type: Array }    
    };
  }

  constructor() {
    super();
    this.timebase = 60;
    this.numSnowFlakes = 200;
    this.speed = 2;
    this.seconds = 30; 
    this.minorSeconds = this.seconds / 3;
    this.snowflakes = new Array(this.numSnowFlakes);
    this.snowflakes.fill('');
    this.stylesSnow = '';
  }

  initializeValues() {
    this.snowflakes = new Array(this.numSnowFlakes);
    this.snowflakes.fill('');
    this.speed = (this.speed <= 0) ? 1 : this.speed;
    this.speed = (this.speed > 10) ? 10 : this.speed;
    this.seconds = parseInt(this.timebase / this.speed, 10); // speed 1 = 60s, 2 = 30s, 3 = 20s, 4 = 15s, 5 = 12s, 6 = 10s, 7 = 8s, 8 = 6s, 9 = 5s, 10 = 4s
    this.minorSeconds = this.seconds / 3;
  }

  firstUpdated() {
    function randomRange(min, max) {
      const rand = Math.random();
      const randomRangeVal = min + Math.floor(rand * ((max - min) + 1));
      return randomRangeVal;
    }
    this.initializeValues();
    this.stylesSnow = this.snowflakes.map((el, idx) => {
      const index = idx + 1;
      const randomX = `${parseInt(Math.random() * 1000000, 10) * 0.0001}`;
      const randomOffset = `${randomRange(-100000, 100000) * 0.0001}`;
      const randomXEnd = `${parseFloat(randomX) + parseFloat(randomOffset)}vw`;
      const randomXEndYoyo = `${parseFloat(randomX) + (parseFloat(randomOffset) / 2)}vw`;
      const randomYoyoTime = randomRange(30000, 80000) / 100000;
      const randomYoyoY = `${randomYoyoTime * 100}vh`;
      const randomScale = `${parseInt(Math.random() * 10000, 10) * 0.0001}`;
      const fallDuration = `${randomRange(this.minorSeconds, this.seconds)}s`;
      const fallDelay = `-${parseInt(Math.random() * this.seconds * 100, 10)/ 100}s`;

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
