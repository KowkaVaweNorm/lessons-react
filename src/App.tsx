import { Outlet } from 'react-router-dom'
import './App.scss'
import { Header } from './widgets/Header'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    console.log('%c Обратите внимание', 'color: red; background-color: #95B46A', 'Включен StrictMode - рендер комопнентов происходит дважды')
  }, [])

  // useEffect(() => {
  //   fetch('http://localhost:3000/posts').then((res) => {
  //     if (res.ok) {
  //       res.json().then((res)=> {
  //         console.log(res);
  //       });
  //     }
  //   })
  // }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
