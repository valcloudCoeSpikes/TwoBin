const groupReducer = (
  state = {
    groups: [],
    selectedGroup : '',
    selectedBin:'',
    selectedGroupID:''
  },
  action
) => {
  switch (action.type) {
    case "LOAD_GROUPS":
      state = {
        groups: action.payload
      };
      return state;
    case "UPDATE_SELECTED":
        state={
            ...state,
            selectedGroup:action.payload
        }
        return state
    case "LOAD_SELECTED_BIN":
                state={
                    ...state,
                    selectedBin:action.payload
                }
                return state;
    case "UPDATE_SELECTEDID":
                state={
                  ...state,
                  selectedGroupID:action.payload
                }
                return state;
    default:
      return state;
  }
};

export default groupReducer;
