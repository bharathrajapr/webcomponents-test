import { SLIDE_IMAGE, TOGGLE_LIGHT_BOX_IMG } from '../actions/app.js';

const INITIAL_STATE = {
  showImagesBool: [true, false, false],
  showLightBoxImgBool: [false, false, false],
  showModal: false
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SLIDE_IMAGE:
      return {
        ...state,
        showImagesBool: state.showImagesBool.map((bool, index) => {
          if (action.index === index) {
            return true;
          } else {
            return false;
          }
        })
      };
    case TOGGLE_LIGHT_BOX_IMG:
      return {
        ...state,
        showLightBoxImgBool: state.showLightBoxImgBool.map((bool, index) => {
          if (action.index === index) {
            return true;
          } else {
            return false;
          }
        }),
        showModal: !state.showModal
      };
    default:
      return state;
  }
};

export default app;
