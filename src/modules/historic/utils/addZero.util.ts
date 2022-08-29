export class AddZeroUtil {
  execute(number: number | string) {
    if (number <= 9) return '0' + number;
    else return number;
  }
}
