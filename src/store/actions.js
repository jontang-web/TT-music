import * as types from './mutation-types';
import {playMode} from '@/assets/js/config';
import {shuffle} from '@/assets/js/util';

function findIndex(list, song) {
    return list.findIndex((item) => item.id===song.id);
}

export const selectPlay = ({commit, state}, {list, index}) => {
    commit(types.SET_SEQUENCE_LIST, list);
    if(state.mode === playMode.random) {
        let randomList = shuffle(list);
        commit(types.SET_PLAYLIST, randomList);
        index = findIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAYLIST, list);
    }
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}

export const randomPlay = ({commit}, {list}) => {
    commit(types.SET_PLAY_MODE, playMode.sequence);
    commit(types.SET_SEQUENCE_LIST, list);
    let randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}

export const insertSong = ({commit, state}, song) => {
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    //记录当前歌曲
    let currentSong = playList[currentIndex];
    let fpIndex = findIndex(playList, song);
    //插入歌曲，索引+1
    currentIndex++;
    playList.splice(currentIndex, 0, song);
    if(fpIndex>-1) {
        if(currentIndex > fpIndex){
            playList.splice(fpIndex, 1);
            currentIndex--;
        }else{
            playList.splice(fpIndex + 1, 1);
        }
    }
    let currentSIndex = findIndex(sequenceList, currentSong) + 1;
    let fsIndex = findIndex(sequenceList, song);
    sequenceList.splice(currentIndex, 0, song);
    if(fsIndex > -1) {
        if(currentSIndex > fsIndex){
            sequenceList.splice(fsIndex, 1);
        }else{
            sequenceList.splice(fsIndex + 1, 1);
        }
    }

    commit(types.SET_PLAYLIST, playList);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}