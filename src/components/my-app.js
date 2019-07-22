import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';
import { slideImage, toggleLightBoxImg } from '../actions/app.js';

class MyApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      _showModal: { type: Boolean },
      _showImagesBool: { type: Array },
      _showLightBoxImgBool: { type: Array }
    };
  }

  static get styles() {
    return [
      css`
      * {
      box-sizing: border-box;
      }
      img {
          width: 100%;
      }
      .content {
          margin-left: auto;
          margin-right: auto;
          max-width: 1200px;
      }
      .row-p5 {
          padding: 5px;
      }
      .section {
          margin-top: 10px;
      }
      .col {
          float: left;
          width: 100%
      }
      .col.s4 {
          width: 33.33333%;
      }
      .section {
        display: flex;
      }
      .cursor-pointer {
          cursor: pointer;
      }
      .opacity {
          opacity: 0.60;
      }
      .opacity-off,
      .hover-opacity-off:hover {
          opacity: 1;
      }
      .modal {
      opacity: 0;
      display: none;
      position: fixed;
      z-index: 1;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: white;
      }
      .modal-content {
      position: relative;
      margin: auto;
      padding: 0;
      width: 90%;
      max-width: 1200px;
      }
      .lightbox-slides {
          display: none;
      }
      .slides {
          height: 800px;
      }
      .mini-slides {
          height: 200px;
      }
      .open-modal {
          display: block;
          opacity: 1;
      }
      .close-modal {
          display: none;
          opacity: 0;
      }
      .show {
        display: block;
      }
      .hide {
        display: none;
      }
      `
    ];
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
    <div>
      <h2>Slides - Click to choose and another click to see lightbox version</h2>
    </div>

    <div id="my-modal" class="${this._showModal ? 'modal open-modal' : 'modal close-modal'}">
        <div class="modal-content">
        ${this._imgSrcs.map((imgSrc, index) => {
          return html`
            <div>
							<img class="${this._showLightBoxImgBool[index] ? 'cursor-pointer show' : 'cursor-pointer hide'}" src="${imgSrc}" @click="${() => this._toggleLightBox(index)}">
						</div>`})}
        </div>
    </div>


    <div class="content">
      ${this._imgSrcs.map((imgSrc, index) => {
        return html`
          <img class="${this._showImagesBool[index] ? 'slides cursor-pointer show' : 'slides cursor-pointer hide'}" src="${imgSrc}" @click="${() => this._toggleLightBox(index)}">`})}
      <div class="section">
        ${this._imgSrcs.map((imgSrc, index) => {
          return html`
            <div class="row-p5 col s4">
              <img class="mini-slides opacity hover-opacity-off cursor-pointer" src="${imgSrc}" @click="${() => this._showImage(index)}">
            </div>`})}
      </div>
    </div>
    `;
  }

  constructor() {
    super();
    this._showImagesBool = [true, false, false];
    this._imgSrcs = ['src/images/image1.jpg', 'src/images/image2.jpg', 'src/images/image3.jpg'];
  }

  _showImage(index) {
    store.dispatch(slideImage(index));
  };

  _toggleLightBox(index) {
    store.dispatch(toggleLightBoxImg(index));
  }

  stateChanged(state) {
    this._showImagesBool = state.app.showImagesBool;
    this._showLightBoxImgBool = state.app.showLightBoxImgBool;
    this._showModal = state.app.showModal;
  }
}

window.customElements.define('my-app', MyApp);