/**
  * @ADEMMERAL_xSmoothScroll
  * https://github.com/ademmeral/XModules/blob/main/xSmoothScroll.js
*/

export function xSmoothScroll(element = document.body, direction = 'y', target = 0, duration = 1000) {
  let reqId;
  const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const startTime = Date.now();
  let startPos = direction === 'y' ? element.scrollTop : element.scrollLeft;

  function xScrollStep() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easing(progress);
    const _scrollTo = startPos + (target - startPos) * ease;
    direction === 'y' ? element.scrollTop = _scrollTo : element.scrollLeft = _scrollTo;
    startPos = _scrollTo;

    if (progress < 1) {
      reqId = window.requestAnimationFrame(xScrollStep);
    }
  }

  reqId = requestAnimationFrame(xScrollStep);
  return {
    clear : () => window.cancelAnimationFrame(reqId)
  }
}
/***** EXAMPLE USAGE *****/

const scrollButton = document.getElementById('scrollButton');

// (!) Always use it in an event handler function 
/* ====== Y Direction ======= */
const elemY = document.querySelector('.box');
scrollButton.addEventListener('click', () => { xSmoothScroll(elemY, 'y', 300, 750) })
elemY.addEventListener('scroll', () => console.log(elemY.scrollTop))

/* ====== X Direction ======= */
// const elemX = document.querySelector('.horizontal');
// scrollButton.addEventListener('click', () => { xSmoothScroll(elemY, 'x', 300, 750) });
// elemX.addEventListener('scroll', () => console.log(elemX.scrollLeft))

