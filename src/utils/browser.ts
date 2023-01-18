export const CANVAS_SIZE = 600;

interface WindowSize {
  width: number;
  height: number;
}

function getWindowSize(): WindowSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export function getCanvasSize(): WindowSize {
  const ws = getWindowSize();
  // On small devices, the canvas should cover:
  // - 80% of available height

  // if (ws.height < CANVAS_SIZE / 0.8) {
  //   ws.height = ws.height * 0.8;
  // }

  return {
    width: ws.width,
    // height: Math.min(CANVAS_SIZE, ws.height)
    height: ws.height
  };
}