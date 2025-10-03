let version = "v0_0001_001";
let statusMsg = "";
const LIBRARIES = [
  // Example: p5.sound (remove or add your own)
  "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.2/addons/p5.sound.min.js",
  // "https://cdn.jsdelivr.net/npm/some-lib@1.0.0/dist/some-lib.min.js",
];

function pSetup()
{
  print("## Portal v: " + version);
  loadLibraries();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function loadLibraries()
{
// Pause drawing until libraries are ready
  noLoop();
  console.log("loading libs");
 
  // Start async load; when finished, resume the sketch
  loadAllLibraries(LIBRARIES)
    .then(() => {
      loading = false;
      console.log("Libraries loaded! Running sketch…");
    })
    .catch(err => {
      statusMsg = err.message;
      console.error(err);
    })
    .finally(() => {
      if (!loading) loop();
    });
}


// 2) Tiny loader that returns a Promise for each script
function loadScript(url) {
  return new Promise((resolve, reject) => {
    // If the same URL was already inserted, resolve immediately
    if ([...document.scripts].some(s => s.src === url)) return resolve(url);

    const s = document.createElement("script");
    s.src = url;
    s.async = true;
    s.onload = () => resolve(url);
    s.onerror = () => reject(new Error(`Failed to load: ${url}`));
    document.head.appendChild(s);
  });
}

// 3) Load all libraries (Promise that resolves when *all* are ready)
function loadAllLibraries(urls) {
  return Promise.all(urls.map(loadScript));
}
