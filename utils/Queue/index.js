import { Node } from './Node.js'

/**
 * @template T
 */
export class Queue {

  /** @private @type { Node<T> | null } */ frontNode = null
  /** @private @type { Node<T> | null } */ backNode = null

  /**
   * Enqueue an element
   * @public
   * @param { T } item
   */
  push( item ) {
    const node = new Node( item )
    if( this.frontNode === null ) { this.frontNode = node }
    if( this.backNode !== null ) { this.backNode.setNextNode( node ) }
    this.backNode = node
  }

  /**
   * Eliminates the front element replacing it by its next element (dequeue)
   * @public
   */
  pop() {
    if( this.frontNode === null ) { return }
    const { nextNode } = this.frontNode
    this.frontNode = nextNode
    if( this.frontNode === null ) { this.backNode = null }
  }

  /**
   * The front element of the Queue
   * @returns { T | undefined }
   */
  get front() {
    if( this.frontNode === null ) { return undefined }
    return this.frontNode.value
  }

  /**
   * Says if the Queue is empty
   * @public
   * @returns { boolean }
   */
  get isEmpty() {
    return this.front === undefined
  }

}
