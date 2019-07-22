export const slideImage = (index) => {
  return {
    type: SLIDE_IMAGE,
    index
  };
};

export const toggleLightBoxImg = (index) => {
  return {
    type: TOGGLE_LIGHT_BOX_IMG,
    index
  };
};

export const SLIDE_IMAGE = 'SLIDE_IMAGE';
export const TOGGLE_LIGHT_BOX_IMG = 'TOGGLE_LIGHT_BOX_IMG';
