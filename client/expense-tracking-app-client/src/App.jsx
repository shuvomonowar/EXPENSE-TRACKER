import Features from "./components/features/Features";
import { DarkModeProvider } from "./components/features/DarkModeContext";

function App() {
  return (
    <>
      <DarkModeProvider>
      <Features />
    </DarkModeProvider>
    </>
  );
}

export default App;
