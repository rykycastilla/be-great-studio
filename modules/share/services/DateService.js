export class DateService {

  /**
   * @private
   * @param { number } num
   * @returns { string }
   */
  static pad( num ) {
    return String( num ).padStart( 2, '0' )
  }

  /**
   * @public
   * @returns { string }
   */
  static generate() {
    const now = new Date()
    const year = DateService.pad( now.getFullYear() )
    const month = DateService.pad( now.getMonth() )
    const day = DateService.pad( now.getDate() )
    const hours = DateService.pad( now.getHours() )
    const minutes = DateService.pad( now.getMinutes() )
    return `${ year }.${ month }.${ day }.${ hours }.${ minutes }`
  }

}
