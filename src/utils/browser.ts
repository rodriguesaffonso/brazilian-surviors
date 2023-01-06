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

  if (ws.height < CANVAS_SIZE / 0.9) {
    ws.height = ws.height * 0.9;
  }

  return {
    width: Math.min(CANVAS_SIZE, ws.width),
    height: Math.min(CANVAS_SIZE, ws.height)
  };
}