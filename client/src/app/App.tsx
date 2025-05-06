import { Routes, Route } from "react-router-dom";
import { PagesLayout } from "@/app/PagesLayout";
import { MainPage } from "@/pages/MainPage/MainPage";

import "./App.scss";

function App() {
    return (
        <Routes>
            <Route element={<PagesLayout />}>
                <Route path="/" element={<MainPage />} />
            </Route>
        </Routes>
    );
}

export default App;
