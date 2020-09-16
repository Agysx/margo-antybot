(() => {
  const $ground = document.getElementById('ground');
  const code = globalThis.__CODE__;
  let n = Number(globalThis.__NTH__);
  function sendBack () {
    n--;
    $ground.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('keydown', onKeyDown);
    _g('_&antybot=' + code);
    if (n > 0) {
      init();
    }
  }
  /**
   * @param {Event} e
   */
  function onMouseDown (e) {
    if (e.isTrusted) {
      sendBack();
    }
  }
  /**
   * @param {Event} e
   */
  function onKeyDown (e) {
    if (e.isTrusted && [37, 38, 39, 40, 65, 68, 83, 87].includes(e.keyCode) && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      sendBack();
    }
  }
  function init () {
    $ground.addEventListener('mousedown', onMouseDown);
    window.addEventListener('keydown', onKeyDown);
  }
  if (n > 0) {
    init();
  }
})();
