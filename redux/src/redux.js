function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];
  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  }

  function subscribe(listener) {
    listeners.push(listener);
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

const initialState = {
  count: 1,
};
const store = createStore(reducer, initialState);

export default store;
