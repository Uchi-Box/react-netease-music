import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { actions } from './store'
import Scroll from '@/components/Scroll'
import Slider from '@/components/Slider'
import HotwallNav from './components/HotwallNav'
import PlaylistRecommend from './components/PlaylistRecommend'
import SongAlbumRecommend from './components/SongAlbumRecommend'
import './index.scss'
import 'swiper/css/swiper.css'

const Find = props => {
  const dispatch = useDispatch()

  // Find是最上层store里面定义的 Find: FindReducer
  // const bannerList = useSelector(state => state.Find.bannerList)
  const selectBannerList = useMemo(
    () =>
      createSelector(
        state => state.Find.bannerList,
        items => items
      ),
    []
  )
  const selectHotwallNavList = useMemo(
    () =>
      createSelector(
        state => state.Find.hotwallList,
        items =>
          items.map(item => ({
            id: item.id,
            content: item.content,
            avatar: item.simpleUserInfo.avatar,
            songCoverUrl: item.simpleResourceInfo.songCoverUrl
          }))
      ),
    []
  )
  const selectRecommendPlaylists = useMemo(
    () =>
      createSelector(
        state => state.Find.recommendPlaylists,
        items => items
      ),
    []
  )
  const selectSceneRecommendPlaylists = useMemo(
    () =>
      createSelector(
        state => state.Find.sceneRecommendPlaylists,
        items => items
      ),
    []
  )
  const selectNewSongAlbum = useMemo(
    () =>
      createSelector(
        state => state.Find.newSongs,
        state => state.Find.newAlbums,
        (newSongs, newAlbums) => ({
          newSongs: newSongs.slice(0, 6),
          newAlbums: newAlbums.slice(0, 6)
        })
      ),
    []
  )

  const bannerList = useSelector(selectBannerList)
  const hotwallNavList = useSelector(selectHotwallNavList)
  const recommendPlaylists = useSelector(selectRecommendPlaylists)
  const sceneRecommendPlaylists = useSelector(selectSceneRecommendPlaylists)
  const newSongAlbum = useSelector(selectNewSongAlbum)

  useEffect(() => {
    dispatch(actions.fetchBannerList())
    dispatch(actions.fetchHotwallList())
    dispatch(actions.fetchRecommendPlaylists())
    dispatch(actions.fetchSceneRecommendPlaylists())
    dispatch(actions.fetchNewSongs())
    dispatch(actions.fetchNewAlbums())
  }, [dispatch])

  return (
    <Scroll>
      <div className="Find">
        {bannerList.length > 0 && <Slider bannerList={bannerList}></Slider>}
        <div className="find-nav">
          <Link to="/recommend/taste">
            <i className="iconfont icon-rili"></i>
            <span>每日推荐</span>
          </Link>
          <Link to="/playlist">
            <i className="iconfont icon-gedan"></i>
            <span>歌单</span>
          </Link>
          <Link to="/toplist">
            <i className="iconfont icon-paihangbang"></i>
            <span>排行榜</span>
          </Link>
          <Link to="/radio">
            <i className="iconfont icon-diantai"></i>
            <span>电台</span>
          </Link>
        </div>
        <div className="hotwall-nav">
          <HotwallNav hotwallNavList={hotwallNavList} />
        </div>
        <div className="recommend-nav">
          <div className="playlist-recommend">
            <PlaylistRecommend
              playlists={recommendPlaylists}
              title={'歌单推荐'}
              intro={'为你精挑细选'}
              linkTo={'/playlist/recommend'}
            />
          </div>
          <div className="scene-recommend">
            <PlaylistRecommend
              playlists={sceneRecommendPlaylists}
              title={'场景推荐'}
              intro={'音乐 照亮你心坎'}
              linkTo={'/playlist/recommend/official'}
            />
          </div>
          <div className="new-song-album-recommend">
            <SongAlbumRecommend newSongAlbum={newSongAlbum} />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </Scroll>
  )
}

export default React.memo(Find)
