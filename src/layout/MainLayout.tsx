import { Footer } from '../components/Layout/Footer'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Layout/Header'

function MainLayout() {
    return (
        <div >
            <Header />
            <main >
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
