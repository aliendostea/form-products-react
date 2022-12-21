export function createModalRootFunction(modalRootId: string): Element | null {
  const body = document.querySelector("body");
  const elementDivExist = document.querySelector(`#${modalRootId}`);

  if (elementDivExist) return elementDivExist;

  const elementDiv = document.createElement("div");
  elementDiv.setAttribute("id", `${modalRootId}`);
  body?.appendChild(elementDiv);

  return document.querySelector(`#${modalRootId}`);
}
