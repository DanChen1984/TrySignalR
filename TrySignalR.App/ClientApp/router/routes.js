import LoginPage from 'components/login/login-page'
import HomePage from 'components/home/home-page'
import AdminPage from 'components/admin/admin-page'

export const routes = [
    { name: 'login', path: '/', component: LoginPage, menu: 'false' },
    { name: 'home', path: '/home', component: HomePage, display: 'Home', icon: 'home' },
    { name: 'admin', path: '/admin', component: AdminPage, display: 'Admin', icon: 'cogs' },
]
