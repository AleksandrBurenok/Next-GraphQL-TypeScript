export const isSsr = () => typeof window === 'undefined';

export const getRootElement = (id: string) => document.getElementById(id);

export const createRootElement = (id: string) => {
  const isElementCreated = getRootElement(id);

  if (!isElementCreated) {
    const el = document.createElement('div');
    el.setAttribute('id', id);
    document.body.appendChild(el);
  }
};

export const generateUuid = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const isWindow = () => typeof window === 'object';

type Out = {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
  any: boolean;
  all: boolean;
};

export const isOutsideOfViewport = (elem: any) => {
  const out: Out = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    all: false,
    any: false,
  };

  if (elem) {
    const bounding = elem.getBoundingClientRect();

    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom =
      bounding.bottom >
      (window.innerHeight || document.documentElement.clientHeight);
    out.right =
      bounding.right >
      (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;
  }

  return out;
};

export const preventWrapper = (callback: (e: any) => void) => (e: any) => {
  e.preventDefault();
  e.stopPropagation();

  callback(e);
};
