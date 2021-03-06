import * as types from './mutation-types'
const mutation = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer;
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag;
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag;
    },
    [types.SET_PLAYLIST](state, list) {
        state.playList = Object.assign([], list);
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = Object.assign([], list);
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode;
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index;
    },
    [types.SET_DISC](state, disc) {
        state.disc = disc;
    },
    [types.SET_TOP_LIST](state, topList) {
        state.topList = topList;
    }
};
export default mutation;
