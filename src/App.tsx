import React from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import FilesSheet from "@/pages/sheets/FilesSheet";
import VideoPage from "@/pages/sheets/VideoPage";

const App: React.FC = () => {
    const navigate = useNavigate();

    const navigateTo = (page: string, id?: number) => {
        if (id) {
            navigate(`/${page}/${id}`);
        } else {
            navigate(`/${page}`);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<FilesSheet navigateTo={navigateTo} />} />
                <Route path="/upload" element={<div>Upload Page</div>} />
                <Route path="/videoPage/:id" element={<VideoPage navigateTo={navigateTo} />} />
            </Routes>
        </Router>
    );
};

export default App;
