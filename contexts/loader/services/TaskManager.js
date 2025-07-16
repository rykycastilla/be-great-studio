import { Queue } from '@/utils/Queue'

/**
 * `TaskManager` is used to indicates when a resolving promise (task) is in the system
 */
export class TaskManager {

  /** @private @readonly @type { Queue<Promise<unknown>> } */ taskList = new Queue()
  #isWorking = false

  /**
   * Callback triggered when `isWorking` changes.
   * @type { ( ( isWorking:boolean ) => void ) | null }
   */
  onworkingstatechange = null

  /**
   * Runs all tasks in the queue one by one.
   * @private
   */
  async work() {
    this.isWorking = true
    while( !this.taskList.isEmpty ) {
      const task = this.taskList.front
      try { await task }
      finally { this.taskList.pop() }
    }
    this.isWorking = false
  }

  /**
   * Adds a task to the queue and starts processing to notify its resolution
   * @public
   * @param { Promise<unknown> } task
   */
  addTask( task ) {
    this.taskList.push( task )
    if( !this.isWorking ) { this.work() }
  }

  /**
   * Notifies the state changes
   * @private
   */
  dispatchWorkingStateChange() {
    if( this.onworkingstatechange === null ) { return }
    this.onworkingstatechange( this.isWorking )
  }

  /**
   * Whether tasks are currently being processed
   * @returns { boolean }
   */
  get isWorking() {
    return this.#isWorking
  }

  /**
   * Whether tasks are currently being processed
   * Notifies the state change listener
   * @private
   * @param { boolean } isWorking
   */
  set isWorking( isWorking ) {
    const hasChanged = isWorking !== this.isWorking
    this.#isWorking = isWorking
    if( hasChanged ) { this.dispatchWorkingStateChange() }
  }

}
