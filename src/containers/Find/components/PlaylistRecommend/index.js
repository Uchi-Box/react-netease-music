import React from 'react'
import { Link } from 'react-router-dom'
import Swiper from 'react-id-swiper'
import PlaylistItem from '@/components/PlaylistItem'
import './index.scss'

const PlaylistRecommend = props => {
  const { recommendPlaylists } = props
  const params = {
    slidesPerView: 'auto',
    resistanceRatio: 0,
    freeMode: true,
    freeModeSticky: true, //自动贴合
    freeModeMomentumBounce: false, //关闭动量反弹
    // spaceBetween: 8,  // 在这里设置无法自动转成vw，改写在.swiper-slide的padding中
    // slidesOffsetBefore: 15,  //在这里设置无法自动转成vw，改写在.swiper-container的padding中
    // slidesOffsetAfter: 15,
    observer: true,
    observeParents: true
  }
  return (
    <div className="PlaylistRecommend">
      <div className="header">
        <div className="header-left">
          <div className="title">推荐歌单</div>
          <div className="intro">为你精挑细选</div>
        </div>
        <Link to="/playlist/recommend" className="header-right">
          查看更多
        </Link>
      </div>
      {recommendPlaylists.length > 0 && (
        <Swiper {...params}>
          {recommendPlaylists.map(item => {
            return (
              <div key={item.id}>
                <PlaylistItem data={item} />
              </div>
            )
          })}
        </Swiper>
      )}
    </div>
  )
}

export default React.memo(PlaylistRecommend)