import {
  createIcon
} from "../../chunks/chunk-OUDMSHVE.js";

// src/vanilla/examples/document-review/example.ts
var form = document.querySelector("#document-review-form");
var input = form?.querySelector("#review-file");
var stack = form?.querySelector(":scope > .soup-stack");
var status = form?.querySelector('[role="status"]');
var button = form?.querySelector('button[type="submit"]');
var reader;
var progress;
var result;
var buttonLabel = button?.textContent ?? "Read file";
function removeFeedback() {
  progress?.remove();
  result?.remove();
  progress = result = void 0;
}
function setBusy(busy) {
  if (form) form.setAttribute("aria-busy", String(busy));
  if (input) input.disabled = busy;
  if (button) {
    button.disabled = busy;
    button.setAttribute("aria-busy", String(busy));
    button.replaceChildren();
    if (busy) {
      const loader = document.createElement("span");
      loader.className = "soup-button__loader";
      loader.setAttribute("aria-hidden", "true");
      button.append(loader);
    }
    button.append(document.createTextNode(busy ? "Reading\u2026" : buttonLabel));
  }
}
function showProgress(total) {
  progress = document.createElement("div");
  progress.className = "soup-progress";
  const heading = document.createElement("div");
  heading.className = "soup-progress__heading";
  const label = document.createElement("label");
  label.htmlFor = "review-progress";
  label.textContent = "Reading files";
  heading.append(label);
  const track = document.createElement("div");
  track.className = "soup-progress__track";
  const bar = document.createElement("progress");
  bar.id = "review-progress";
  bar.className = "soup-progress__bar";
  bar.max = total;
  track.append(bar);
  const indeterminate = document.createElement("span");
  indeterminate.className = "soup-progress__indeterminate";
  indeterminate.setAttribute("aria-hidden", "true");
  track.append(indeterminate);
  progress.append(heading, track);
  stack?.append(progress);
}
function updateProgress(loaded, total, complete = false) {
  const heading = progress?.querySelector(".soup-progress__heading");
  const label = heading?.querySelector("label");
  const bar = progress?.querySelector("progress");
  if (!heading || !bar) return;
  if (label && complete) label.textContent = "Files read";
  bar.value = loaded;
  progress?.querySelector(".soup-progress__indeterminate")?.remove();
  let percentage = heading.querySelector("span");
  if (!percentage) {
    percentage = document.createElement("span");
    percentage.setAttribute("aria-hidden", "true");
    heading.append(percentage);
  }
  percentage.textContent = `${Math.round(Math.min(100, Math.max(0, loaded / total * 100)))}%`;
}
function alert(titleText, detailText, tone) {
  result = document.createElement("div");
  result.className = `soup-alert soup-tone--${tone}`;
  result.setAttribute("role", tone === "danger" ? "alert" : "status");
  result.append(createIcon(tone === "danger" ? "alert" : "info"));
  const body = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = titleText;
  const detail = document.createElement("div");
  detail.textContent = detailText;
  body.append(title, detail);
  result.append(body);
  stack?.append(result);
}
input?.addEventListener("change", () => {
  removeFeedback();
  const length = input.files?.length ?? 0;
  if (status) status.textContent = length ? `${length} ${length === 1 ? "file" : "files"} ready for review` : "Select a file to continue";
  input.setAttribute("aria-invalid", "false");
  input.setAttribute("aria-describedby", "review-file-description");
  form?.querySelector("#review-file-error")?.remove();
});
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const files = Array.from(input?.files ?? []);
  if (!files.length || !form.reportValidity()) return;
  reader?.abort();
  removeFeedback();
  setBusy(true);
  const total = Math.max(1, files.reduce((sum, file) => sum + file.size, 0));
  showProgress(total);
  let done = 0;
  let index = 0;
  const next = () => {
    if (index >= files.length) {
      updateProgress(total, total, true);
      setBusy(false);
      alert("Review complete", files.length === 1 ? `${files[0].name} read locally. No files were uploaded.` : `${files.length} files read locally. No files were uploaded.`, "success");
      reader = void 0;
      return;
    }
    const file = files[index];
    reader = new FileReader();
    reader.onprogress = (progressEvent) => {
      if (progressEvent.lengthComputable) updateProgress(done + progressEvent.loaded, total);
    };
    reader.onload = () => {
      done += file.size;
      index++;
      updateProgress(done, total);
      next();
    };
    reader.onerror = () => {
      setBusy(false);
      input?.setAttribute("aria-invalid", "true");
      input?.setAttribute("aria-describedby", "review-file-error");
      const error = document.createElement("p");
      error.id = "review-file-error";
      error.className = "soup-field__error";
      error.setAttribute("role", "alert");
      error.textContent = "The file could not be read. Try choosing it again.";
      input?.closest(".soup-field")?.append(error);
      reader = void 0;
    };
    reader.readAsArrayBuffer(file);
  };
  next();
});
window.addEventListener("pagehide", () => reader?.abort());
