import { Vector2 } from "three";
import { lerp } from "three/src/math/MathUtils.js";

export const useSquishyCursor = (element: HTMLElement) => {
  const STRETCH_FACTOR = 0.25;
  const STRETCH_VELOCITY = 3;
  const POSITION_CORRECTION = 1;
  const EXPANSION_INTERPOLATION = 0.1;
  const EXPANDED_SCALE = 1;

  const cursor = document.createElement("div");
  const expanded = ref(false);
  
  cursor.id = "cursor";
  cursor.style.display = "none";
  cursor.style.transformOrigin = "center";
  document.body.appendChild(cursor);
  element.style.cursor = "none";

  const elementCentre = new Vector2(element.offsetWidth / 4, element.offsetHeight / 4);

  let mousePosition = new Vector2().copy(elementCentre);
  let lastMousePosition = new Vector2().copy(elementCentre);
  let cursorPosition = new Vector2().copy(elementCentre);
  let velocity = new Vector2(0, 0);
  let currentExpansion = 0;

  document.addEventListener("mousemove", (event) => {
    mousePosition = new Vector2(event.clientX - cursor.clientWidth / 2 + POSITION_CORRECTION, event.clientY - cursor.clientHeight / 2 + POSITION_CORRECTION);
    cursor.style.display = "block";
  });

  function animate() {
    velocity = new Vector2().copy(mousePosition).sub(lastMousePosition);
    lastMousePosition = new Vector2().copy(mousePosition);

    cursorPosition.lerp(mousePosition, 0.8);
    
    let angle = 0;
    let scale = 1;
    
    if (velocity.length() > STRETCH_VELOCITY) {
      scale = 1 + Math.min(Math.abs(velocity.length() - STRETCH_VELOCITY) * STRETCH_FACTOR, 2.5);
      angle = new Vector2().copy(cursorPosition).sub(mousePosition).angle() * (180 / Math.PI);
    }

    const targetExpansion = expanded.value ? EXPANDED_SCALE : 0;
    currentExpansion = lerp(currentExpansion, targetExpansion, EXPANSION_INTERPOLATION);

    cursor.style.transform = `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0) rotate(${angle}deg) scale(${scale + currentExpansion}, ${1 + currentExpansion})`;

    requestAnimationFrame(animate);
  }

  animate();
  
  return({ expanded });
}