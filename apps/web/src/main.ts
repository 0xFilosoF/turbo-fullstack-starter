import './style.css';
import typescriptLogo from '/typescript.svg';
import { getTitle } from '@repo/common';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    ${Header({ title: getTitle() })}
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerText = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(++counter));
  setCounter(0);
}

function Header({ title }: { title: string }) {
  return `
    <header id="header">
      <h1>${title}</h1>
    </header>
    `;
}
