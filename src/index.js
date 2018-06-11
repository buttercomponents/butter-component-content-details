import React from 'react'

import {Switch, Route} from 'react-router-dom'

import Info from './components/info'

import style from './style.styl'

const Identity = (props) => (props)

const locationToSeasonURL = ({hash}) => hash.replace(/^#/, '')
  .replace(/\/s\/[0-9]+.*/, '')

const DetailSwitch = (props) => {
  const baseUrl = locationToSeasonURL(location)
  let {goBack, seasons = []} = props

  const pathSeasons = seasons.map(
    (season, i) => Object.assign({}, props, season, {
      path: `${baseUrl}/s/${i + 1}`
    })
  )

  return (
    <div className={style.container}>
        <Switch>
            <Route path={`${baseUrl}/s/:sid/e/:eid`} render={({match, history}) => {
                const season = seasons[match.params.sid - 1] || {episodes: []}
                const episode = season.episodes[match.params.eid - 1] || {}
                goBack = {
                  title: seasons.length > 1 ? `${props.title} - ${season.title}` : goBack.title,
                  action: history.goBack
                }
                return (
                  <Info {...props} {...episode} seasons={pathSeasons} goBack={goBack} />
                )
            }} />
            <Route path={`${baseUrl}/s/:sid`} render={({match, history}) => {
                const season = seasons[match.params.sid - 1] || {}
                goBack = {
                  title: seasons.length > 1 ? props.title : goBack.title,
                  action: history.goBack
                }
                return (
                  <Info {...props} {...season} seasons={pathSeasons} goBack={goBack} />
                )
            }} />
            <Route render={() => <Info {...infoProps} seasons={pathSeasons} goBack={goBack} />} />
        </Switch>
    </div>
  )
}

const ContentDetails = ({backdrop, ...props}) => ([
  <div key='content-navbar' className={style.backdrop} style={{backgroundImage: `url(${backdrop})`}} />,
  <DetailSwitch key={`switch-${props.id}`} {...props} />
])

ContentDetails.defaultProps = {
  subtitles: {none: null},
  torrents: {Unknown: null},
  genres: ['none'],
  goBack: {action: Identity, title: 'Go Back'},
  actions: {
    DETAIL: () => console.log('call DETAIL')
  },
  dispatch: a => a
}

export {
  ContentDetails as default
}
