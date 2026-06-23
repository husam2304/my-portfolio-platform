import { Route, Routes } from 'react-router'
import MainLayout from '../layout/MainLayout'
import { Home } from '../Pages/Home'
import About from '../Pages/About'
import { Projects } from '../Pages/Projects'
import { ProjectDetails } from '../Pages/ProjectDetails'
import { Resume } from '../Pages/Resume'
import { Contact } from '../Pages/Contact'

function Approute() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
            </Route>
        </Routes>
    )
}

export default Approute
