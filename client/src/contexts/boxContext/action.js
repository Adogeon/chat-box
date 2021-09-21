export const loadAllBox = (dispatch, boxArr) => {
  const boxMap = new Map(boxArr.map((box) => [box._id, box]));
  dispatch({ type: "LOAD_ALL", payload: boxMap });
};

import { getBox } from "../../adapters/boxAdapter";
export const loadBox = async (dispatch, boxId, token) => {
  //await getBox (id)
  const box = await getBox(boxId, token);
  dispatch({
    type: "LOAD_BOX",
    payload: {
      detail: box.boxDetail,
      log: box.log,
    },
  });
};

export const updateBox = async (dispatch, boxId, update) => {
  dispatch({ type: "UPDATE_BOX", boxId, update });
};

export const changeDisplay = async (dispatch, mode) => {
  switch (mode) {
    case "archived":
      break;
    case "saved":
      break;
    case "all":
    default:
  }
};
