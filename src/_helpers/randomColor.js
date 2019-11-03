import * as randCol from 'randomcolor'

/**
 *
 * @param {string} username to be used as seed
 */
export function randomColor(username) {
  return randCol({ seed: username })
}
