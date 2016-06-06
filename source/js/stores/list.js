import AppDispatcher from '../dispatcher/dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import Constants from '../constants/constants';

const { ActionTypes } = Constants;

const events = new EventEmitter();
const CHANGE_EVENT = 'CHANGE';

const state = {
  items: [],
  loaded: false
};

function setState (newState) {
  console.log('set state');
  assign(state, newState);
  events.emit(CHANGE_EVENT);
}

const ListStore = {
  addChangeListener (fn) {
    events.addListener(CHANGE_EVENT, fn);
  },

  removeChangeListener (fn) {
    events.removeListener(CHANGE_EVENT, fn);
  },

  getState () {
    console.log('get state', state);
    return state;
  }
};

ListStore.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  console.log('dispatchToken', action);

  if (action.type === ActionTypes.LIST_LOADED) {
    setState({
      loaded: true,
      items: action.list
    });
  }

  if (action.type === ActionTypes.ITEM_DELETED) {
    const newList = state.items.filter((item) => (
      item.id !== action.list.id
    ));
    setState({ items: newList });
  }
});

export default ListStore;
