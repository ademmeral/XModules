export function xInterval(callback, interval) {
  let startTime = null;
  let reqId;
  function loop(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime;

    if (elapsed >= interval) {
      callback();
      startTime = timestamp;
    }

    reqId = window.requestAnimationFrame(loop);
  }

  reqId = window.requestAnimationFrame(loop);

  return {
    clear : function(){cancelAnimationFrame(reqId)}
  }
}

// Example usage:
/*
 
let count = 0;
const interval = xInterval(() => {
  count++
  console.log(count);
}, 1000);

// the way to clear 
//interval.clear()

*/

