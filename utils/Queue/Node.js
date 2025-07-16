/**
 * @template T
 */
export class Node {

  #value
  /** @type { Node<T> | null } */ #nextNode = null

  /**
   * @param { T } value
   */
  constructor( value ) {
    this.#value = value
  }

  /**
   * @public
   * @param { Node<T> } nextNode
   */
  setNextNode( nextNode ) {
    this.#nextNode = nextNode
  }

  get value() {
    return this.#value
  }

  get nextNode() {
    return this.#nextNode
  }

}
