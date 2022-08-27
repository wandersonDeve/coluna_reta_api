import { AddZeroUtil } from './addZero.util';

export class FormatDateUtil {
  execute(date: Date) {
    const addZeroUtil = new AddZeroUtil();

    const dateFormatted =
      addZeroUtil.execute(date.getDate().toString()) +
      '/' +
      addZeroUtil.execute(date.getMonth() + 1).toString() +
      '/' +
      date.getFullYear();

    return dateFormatted;
  }
}
