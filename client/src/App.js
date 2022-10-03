import React from 'react'
import TopBar from './components/topbar/TopBar'
import Hero from './components/hero/Hero'
import Home from './components/home/Home'
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import Auth from './pages/auth/Auth'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useGlobalContext } from './context/context'
const App = () => {
  const { user } = useGlobalContext()
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path='/'>
          <Hero />
          <Home />
        </Route>
        <Route path='/post/:postId'>
          <Single />
        </Route>
        <Route path='/write'>{user ? <Write /> : <Auth />}</Route>
        <Route path='/settings'>{user ? <Settings /> : <Auth />}</Route>
        <Route path='/auth'>
          <Auth />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
