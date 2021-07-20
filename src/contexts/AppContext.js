import { useMediaQuery } from '@material-ui/core';
import { useConfirm } from 'material-ui-confirm';
import React, { createContext, useReducer, useEffect, useMemo } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useStyles } from './styles';
import queryString from 'query-string';
import { getItem } from '../ctrl/storage';

const state = {
  drawer: {
    anchor: 'left',
    open: false
  },
  setting: getItem('setting') ||  { theme: 'dark' },
}

const AppContext = createContext(state);

const settingReducer = (state, action) => {
  let newState = action?.payload || {};
  switch (action.type) {
    case 'TOGGLE_THEME':
      newState = { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }
      break;
    case 'SET_VALUE':
      newState = { ...state, ...newState }
      break;
    default:
      newState = state
      break;
  }
  localStorage.setItem('setting', JSON.stringify(newState))
  return newState
}

const drawerReducer = (state, action) => {
  let newState = action?.payload || {};
  switch (action.type) {
      case 'TOGGLE_DRAWER':
          newState = { ...state, open: !state.open }
          return newState;
      case 'SET_VALUE':
          return { ...state, ...newState };
      default:
          return state;
  }
}

const AppProvider = props => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const confirm = useConfirm()
  const classes = useStyles()

  const history = useHistory()
  const location = useLocation()
  const query = useMemo(() => location.search ? queryString.parse(location.search) : {}, [location.search])
  const setQuery = newQuery => {
    history.push({
      ...location,
      search: queryString.stringify(newQuery),
    })
  }

  const [drawer, actionDrawer] = useReducer(drawerReducer, state.drawer)
  const [setting, actionSetting] = useReducer(settingReducer, state.setting)

  const toggleDrawer = () => actionDrawer({ type: 'TOGGLE_DRAWER' })
  const toggleTheme = () => actionSetting({ type: 'TOGGLE_THEME' })

  useEffect(() => {
    const preThemDark = setting.theme === 'dark'
    if (!preThemDark === !prefersDarkMode) {
      actionSetting({
        type: 'SET_VALUE',
        payload: {
          theme: prefersDarkMode ? 'dark' : 'light'
        }
      })
    }
  }, [prefersDarkMode])

  return <AppContext.Provider
  value={{
    drawer,
    actionDrawer,
    toggleDrawer,
    setting,
    actionSetting,
    toggleTheme,
    classes,
    query,
    setQuery
  }}
>
  {props.children}
</AppContext.Provider>
}

export { AppContext, AppProvider };