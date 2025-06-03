let thereWasRecentExecution = false

type AnyFunction = ( ...args:any[] ) => any
type NullableFunction<T extends AnyFunction> = ( ...args:Parameters<T> ) => ReturnType<T> | undefined

/**
 * Runs functions marked as debounce (passed to this function as callbacks) only one time,
 * avoiding its executions until `timeout` has passed
 *
 * **This is a global config**, Every action executed must wait for the `timeout` of the
 * previous execution ending to be invoked again
 * @param action  Action to be executed
 * @param timeout  Time within which (from the previous execution), no actions can be executed
 * @returns  A function that cannot be executed two times within the delay range
 */
export function debounce<T extends AnyFunction>( action:T, timeout:number ): NullableFunction<T> {
  return ( ...args:Parameters<T> ): ReturnType<T> | undefined => {
    if( thereWasRecentExecution ) { return }
    // Executing
    thereWasRecentExecution = true
    setTimeout( () => thereWasRecentExecution = false, timeout )
    return action( ...args )
  }
}
