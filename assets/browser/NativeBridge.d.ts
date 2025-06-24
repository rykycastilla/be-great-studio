declare namespace NativeBridge {

  type CallHandler = ( data:any ) => any
  function onCall( target:string, handle:CallHandler ): void

}
