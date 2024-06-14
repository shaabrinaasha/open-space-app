/**
 * @TODO: Define all the actions (creator) for the talks state
 */
import api from "../../utils/api";

const ActionType = {
  RECEIVE_TALKS: "RECEIVE_TALKS",
  ADD_TALK: "ADD_TALK",
  TOGGLE_LIKE_TALK: "TOGGLE_LIKE_TALK",
};

function receiveTalksActionCreator(talks) {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
}

function addTalkActionCreator(talk) {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    },
  };
}

function toggleLikeTalkActionCreator({ talkId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_TALK,
    payload: {
      talkId,
      userId,
    },
  };
}

// thunk function process addTalk
function asyncAddTalk({ text, replyTo = "" }) {
  return async (dispath) => {
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispath(addTalkActionCreator(talk));
    } catch (error) {
      alert(error.message);
    }
  };
}

// thunk function process toggleLike
function asyncToggleLikeTalk(talkId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));

    try {
      await api.toggleLikeTalk(talkId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveTalksActionCreator,
  addTalkActionCreator,
  toggleLikeTalkActionCreator,
  asyncAddTalk,
  asyncToggleLikeTalk,
};
