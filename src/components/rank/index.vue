<template>
    <div class="rank" ref="rank">
        <scroll :data="topList" class="toplist" ref="topList">
            <ul>
                <li v-for="(item, index) in topList" :key="index" class="item" @click="selectItem(item)">
                    <div class="icon">
                        <img src="" width="100" height="100" v-lazy="item.picUrl">
                    </div>
                    <ul class="songlist">
                        <li v-for="(song, index) in item.songList" :key="index" class="song">
                            <span>{{index + 1}}</span>
                            <span>{{song.songname}} - {{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
import scroll from 'base/scroll';
import loading from 'base/loading';

import {playlistMixin} from '@/assets/js/mixin';
import {getRankList} from 'api/rank';
import {ERR_OK} from 'api/config';
import {mapMutations} from 'vuex';

export default {
    mixins: [playlistMixin],
    data() {
        return {
            topList: []
        }
    },
    created() {
        this._getRankList();
    },
    components: {
        scroll,
        loading
    },
    methods: {
        handlePlayList(playlist) {
            const bottom = playlist.length ? '60px' : '';
            this.$refs.rank.style.bottom = bottom;
            this.$refs.topList.refresh();
        },
        _getRankList() {
            getRankList().then(res => {
                if(res.code === ERR_OK){
                    this.topList = res.data.topList;
                }
            });
        },
        selectItem(item) {
            this.$router.push({
                path: `/rank/${item.id}`
            });
            this.setTopList(item);
        },
        ...mapMutations({
            setTopList: 'SET_TOP_LIST'
        })
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_variable.scss';
@import "@/assets/css/_mixin.scss";
.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        .song {
          @include no-wrap();
          line-height: 26px;
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
