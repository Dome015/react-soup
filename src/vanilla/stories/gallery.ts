import manifest from './manifest.json';

const storySelect = document.querySelector<HTMLSelectElement>('#story')!;
const themeSelect = document.querySelector<HTMLSelectElement>('#theme')!;
const reactFrame = document.querySelector<HTMLIFrameElement>('#react-frame')!;
const vanillaFrame = document.querySelector<HTMLIFrameElement>('#vanilla-frame')!;

for (const entry of manifest) {
  const option = document.createElement('option');
  option.value = entry.id;
  option.textContent = `${entry.title} / ${entry.name}`;
  storySelect.append(option);
}

function showStory() {
  const entry = manifest.find(item => item.id === storySelect.value) ?? manifest[0];
  const theme = themeSelect.value;
  document.documentElement.dataset.theme = theme;
  reactFrame.src = `../../../storybook-static/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story&globals=theme:${encodeURIComponent(theme)}`;
  vanillaFrame.src = entry.html;
  vanillaFrame.onload = () => { if (vanillaFrame.contentDocument) vanillaFrame.contentDocument.documentElement.dataset.theme = theme; };
}

storySelect.addEventListener('change', showStory);
themeSelect.addEventListener('change', showStory);
showStory();
