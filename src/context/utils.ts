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
