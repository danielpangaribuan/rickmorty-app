import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetail";
import CharacterByLocation from "./pages/CharacterByLocation";
import NavbarApp from "./components/navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarApp />
        <Routes>
          <Route path="/">
            <Route index element={<CharacterList />} />
            <Route path="characterDetail/:id" element={<CharacterDetail />} />
            <Route path="characterByLocation" element={<CharacterByLocation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
