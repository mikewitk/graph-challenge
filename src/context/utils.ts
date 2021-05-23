import moment from 'moment';
import {TransactionType} from '../types';

type ThunkAction<T> = (dispatch: React.Dispatch<T>) => T;
type AsyncDispatch<T> = React.Dispatch<T | ThunkAction<T>>;

export function wrapAsync<T>(dispatch: React.Dispatch<T>): AsyncDispatch<T> {
  return function (action: T | ThunkAction<T>) {
    if (action instanceof Function) {
      return action(dispatch);
    }
    return dispatch(action);
  };
}

export const sortAsc = (data: Array<TransactionType>) => {
  data.sort((transactionA, transactionB) => {
    if (moment(transactionA.date).isAfter(transactionB.date)) return 1;
    if (moment(transactionA.date).isBefore(transactionB.date)) return -1;
    return 0;
  });
  return data;
};
