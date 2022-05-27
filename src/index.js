import "./index.css";

import katex from "katex";
import "katex/dist/katex.min.css";
import "katex/dist/contrib/mhchem.js";
import renderMathInElement from "katex/dist/contrib/auto-render.js";

import showdown from "showdown";

const converter = new showdown.Converter({
  openLinksInNewWindow: true,
  simpleLineBreaks: true,
  simplifiedAutoLink: true,
  smoothLivePreview: true,
});
const content = document.getElementById("content");
const input = document.getElementById("markdownInput");

const renderMath = () => {
  renderMathInElement(content, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
  });
};
const render = (data) => {
  let text =
    data === "\n" ? "Füge deinen Text auf der **rechten Seite** ein." : data;
  let html = converter.makeHtml(text);

  content.innerHTML = html;
  renderMath();
};

window.addEventListener("load", (_) => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.body.classList.add("dark");
  render(input.innerText);
  renderMath();
});

input.addEventListener("paste", (event) => {
  document.execCommand(
    "insertText",
    false,
    event.clipboardData.getData("text/plain") || ""
  );
  render(input.innerText);
  event.preventDefault();
});
input.addEventListener("keyup", (_) => {
  render(input.innerText);
});

const toggleDarkmode = (_) => {
  document.body.classList.toggle("dark");
};
document
  .querySelector("#darkmodeToggle")
  .addEventListener("change", (_) => toggleDarkmode());
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", toggleDarkmode);
