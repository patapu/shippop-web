import { Typography } from '@material-ui/core'
import React, { useMemo } from 'react'
import BlankLayout from './BlankLayout'
import MainLayout from './MainLayout'

const SwitchLayout = {
  BlankLayout,
  MainLayout
}

export default function Layout({ component, name, children, ...props }) {

  const Component = useMemo(() => {
    if (component) return component
    else return name ? SwitchLayout[name] : BlankLayout
  }, [component, name])

	return <Component {...props}>
		{children}
	</Component>
}