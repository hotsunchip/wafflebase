// Dev-only sandbox to eyeball the notes code-block styling without a backend.
// Mounts the real notes editor (exported `initialize` + `MemNoteStore`) so it
// exercises the actual fence renderer (preview.ts) and notes-preview.css.
import "./index.css";
import {
  initialize,
  MemNoteStore,
  type NoteEditorAPI,
  type NoteViewMode,
} from "@wafflebase/notes";

const SAMPLE = [
  "# Notes code-block sandbox",
  "",
  "Inline code like `const answer = 42` should read as a subtle pill,",
  "not a bare word, and should have no stray `backticks` around it.",
  "",
  "A JS fence (syntax highlight + Copy button pinned top-right):",
  "",
  "```js",
  "function greet(name) {",
  "  // A very long line to force horizontal scroll and prove the Copy button stays pinned while the code scrolls sideways ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
  "  return `hello, ${name}`;",
  "}",
  "```",
  "",
  "A plain (unlanguaged) fence:",
  "",
  "```",
  "just some text",
  "no highlighting here",
  "```",
  "",
  "Regular prose paragraph after the code, to check spacing.",
].join("\n");

const container = document.getElementById("editor") as HTMLElement;
const store = new MemNoteStore(SAMPLE);

let theme: "light" | "dark" = "light";
let mode: NoteViewMode = "both";
let api: NoteEditorAPI | null = null;

function mount() {
  api?.dispose?.();
  container.innerHTML = "";
  document.documentElement.classList.toggle("dark", theme === "dark");
  api = initialize(container, store, theme, false, mode);
}

document.getElementById("toggle-dark")?.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  mount();
});
document.getElementById("toggle-mode")?.addEventListener("click", () => {
  mode = mode === "both" ? "view" : "both";
  mount();
});

mount();
