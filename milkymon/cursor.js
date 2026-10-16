/* Milkymon shared cursor: a small plum dot with rose outline and click ripple.
 * Both index.html and staff.html load this file. The system cursor remains the
 * fallback for touch devices, reduced-motion environments, and script failure.
 */
(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  const dot = document.createElement('div');
  dot.className = 'milkymon-cursor';
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);

  const root = document.documentElement;
  const interactiveSelector = 'a, button, label, summary, select, [role="button"]';
  const editableSelector = 'input, textarea, select, [contenteditable="true"], [role="textbox"]';
  let hasPointer = false;

  function hide() {
    hasPointer = false;
    root.classList.remove('milkymon-cursor-active');
    dot.classList.remove('is-visible', 'is-hovering', 'is-pressed', 'is-clicking');
  }

  function move(event) {
    if (!finePointer.matches || (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen')) {
      hide();
      return;
    }
    const element = event.target instanceof Element ? event.target : null;
    if (element?.closest(editableSelector)) {
      hide();
      return;
    }
    dot.style.setProperty('--cursor-x', `${event.clientX}px`);
    dot.style.setProperty('--cursor-y', `${event.clientY}px`);
    if (!hasPointer) {
      hasPointer = true;
      dot.classList.add('is-visible');
      root.classList.add('milkymon-cursor-active');
    }
    dot.classList.toggle('is-hovering', Boolean(element?.closest(interactiveSelector)));
  }

  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', event => {
    if (!hasPointer || event.button !== 0 || event.pointerType === 'touch') return;
    dot.classList.add('is-pressed');
    dot.classList.remove('is-clicking');
    // Restart the short ripple on consecutive clicks.
    void dot.offsetWidth;
    dot.classList.add('is-clicking');
  }, { passive: true });
  window.addEventListener('pointerup', () => dot.classList.remove('is-pressed'), { passive: true });
  window.addEventListener('pointercancel', hide, { passive: true });
  document.addEventListener('mouseleave', hide);
  window.addEventListener('blur', hide);
  finePointer.addEventListener?.('change', hide);
})();
