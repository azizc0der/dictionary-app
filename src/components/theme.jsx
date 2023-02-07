import React, { useEffect, useState } from 'react'
import Sun from '../images/sunny.png'
import Moon from '../images/moon.png'

const getStorageTheme = () => {
  let theme = 'light-theme'
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme')
  }
  return theme
}

const Theme = () => {
  const [theme, setTheme] = useState(getStorageTheme())
  const [themeImage, setThemeImage] = useState(false)

  const handleThemImage = () => {}

  const toggleTheme = () => {
    setThemeImage(!themeImage)
    if (theme === 'light-theme') {
      setTheme('dark-theme')
    } else {
      setTheme('light-theme')
    }
  }

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
      <div className="cursor-pointer" onClick={toggleTheme}>
        <img className='w-[40px]' src={themeImage ? Moon : Sun} alt="themeImage" />
      </div>
  )
}

export default Theme
