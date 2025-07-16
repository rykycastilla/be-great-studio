export interface LoaderContext {
  addTask( task:Promise<unknown> ): void
}
