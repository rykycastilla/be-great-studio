/**
 * @param { number } cx
 * @param { number } cy
 * @param { number } ex
 * @param { number } ey
 * @returns { number }
 */
export function angle( cx, cy, ex, ey ) {
  const dy = ey - cy
  const dx = ex - cx
  let theta = Math.atan2( dy, dx ) // rango (-PI, PI]
  if ( theta < 0 ) theta = 2 * Math.PI + theta // rango [0, 2PI)
  return theta
}
