const comparisonSection = `
  <section class="section comparisons" id="comparisons">
    <div class="section-kicker">COMPARISONS</div>
    <div class="section-head">
      <h2>Comparison of Different Trajectory Control Strategies.</h2>
    </div>
    <div class="comparison-grid">
      <figure class="comparison-card">
        <div class="comparison-video-shell">
          <video controls playsinline preload="metadata" poster="/project/PlayWorld/comparisons/preset-only-gc002.jpg">
            <source src="/project/PlayWorld/comparisons/preset-only-gc002.mp4" type="video/mp4">
            Your browser does not support video playback.
          </video>
          <span class="comparison-label">Preset Only</span>
        </div>
      </figure>
      <figure class="comparison-card">
        <div class="comparison-video-shell">
          <video controls playsinline preload="metadata" poster="/project/PlayWorld/comparisons/worldplay-agent-gc002.jpg">
            <source src="/project/PlayWorld/comparisons/worldplay-agent-gc002.mp4" type="video/mp4">
            Your browser does not support video playback.
          </video>
          <span class="comparison-label comparison-label-agent">WorldPlay Agent</span>
        </div>
      </figure>
    </div>
  </section>
`;

function ensureComparisonStyles() {
  if (document.querySelector('link[data-playworld-comparisons]')) return;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = '/project/PlayWorld/assets/comparisons.css';
  stylesheet.dataset.playworldComparisons = 'true';
  document.head.append(stylesheet);
}

function mountComparisons() {
  ensureComparisonStyles();

  const fullProcess = document.querySelector('#full-process');
  if (!fullProcess || document.querySelector('#comparisons')) return;

  fullProcess.insertAdjacentHTML('beforebegin', comparisonSection);

  const nav = document.querySelector('.nav-links');
  const fullProcessLink = nav?.querySelector('a[href="#full-process"]');
  if (nav && fullProcessLink && !nav.querySelector('a[href="#comparisons"]')) {
    const comparisonLink = document.createElement('a');
    comparisonLink.href = '#comparisons';
    comparisonLink.textContent = 'Comparisons';
    nav.insertBefore(comparisonLink, fullProcessLink);
  }
}

function initializeComparisons() {
  mountComparisons();
  requestAnimationFrame(() => requestAnimationFrame(mountComparisons));

  const observer = new MutationObserver(mountComparisons);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComparisons, { once: true });
} else {
  initializeComparisons();
}
