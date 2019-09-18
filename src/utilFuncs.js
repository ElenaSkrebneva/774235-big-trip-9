const createElement = (template) => {
  let parent = document.createElement(`div`);
  parent.innerHTML = template;
  return parent.firstChild;
};

const renderElement = (element, parent, place) => {
  switch (place) {
    case `beforeend`:
      parent.appendChild(element);
      break;
    case `afterbegin`:
      parent.prepend(element);
      break;
    default:
      parent.appendChild(element);
  }
};

const renderHTML = (template, parent, place) => {
  parent.insertAdjacentHTML(place, template);
};

const removeElement = (element) => {
  if (element) {
    element.remove();
  }
};

export {createElement, renderElement, renderHTML, removeElement};
