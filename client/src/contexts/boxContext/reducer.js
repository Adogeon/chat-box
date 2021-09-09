export const initialState = {
  userBoxes: [],
  currentBox: {},
  currentLog: [],
  currentMember: [],
  displayList: [],
};

export const BoxReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "LOAD_BOX":
      return {
        ...state,
        currentBox: action.payload.detail,
        currentLog: action.payload.log,
      };
    case "LOAD_ALL":
      return {
        ...state,
        userBoxes: action.payload,
      };
    case "UPDATE_BOX":
      const newUserBoxes = new Map(state.userBoxes);
      let updateBox = newUserBoxes.get(action.payload.id);
      updateBox = {
        ...updateBox,
        [action.payload.update.key]: action.payload.update.value,
      };
      newUserBoxes.set(action.payload.id, updateBox);
      return {
        ...state,
        userBoxes: newUserBoxes,
      };
    case "UPDATE_LOG":
      return {
        ...state,
        currentLog: [...state.currentLog, action.payload],
      };
    case "UPDATE_MEMBER":
      return {
        ...state,
        currentMember: [...state.currentMember, action.payload],
      };
    case "CHANGE_DISPLAY":
      const newDisplay = [...state.userBoxes]
        .filter((kev, value) => {
          switch (action.payload) {
            case "archived":
              return value.archived;
            case "saved":
              return value.saved;
            case "all":
            default:
              return true;
          }
        })
        .map((data) => data[1]);
      return {
        ...state,
        displayList: newDisplay,
      };
    default:
      throw new Error("Can't handle " + action);
  }
};
