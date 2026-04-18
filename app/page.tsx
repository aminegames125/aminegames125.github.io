import Hero from "./components/sections/Hero";
import Bio from "./components/sections/Bio";
import Projects from "./components/sections/Projects";
import Stack from "./components/sections/Stack";
import Vibe from "./components/sections/Vibe";
import Contact from "./components/sections/Contact";
import CursorGlow from "./components/CursorGlow";
import BackgroundBlobs from "./components/BackgroundBlobs";
import NavBar from "./components/NavBar";

export default function Page() {
  return <>
    <CursorGlow />
    <BackgroundBlobs />
    <NavBar />
    <main><Hero /><Bio /><Projects /><Stack /><Vibe /><Contact /></main>
  </>;
}
