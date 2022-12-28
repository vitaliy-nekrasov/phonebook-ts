import "./App.css";
// import { ContactForm } from "./components/ContactForm/ContactForm";
// import { Filter } from "./components/Filter/Filter";
// import { ContactList } from "./components/ContactList/ContactList";
import { LogIn } from "./pages/LogIn/LogIn";
import { RegisterForm } from "./pages/RegisterForm/RegisterForm";
// import { Title, Subtitle, Wrapper } from "./App.styled";
import { Route, Routes } from "react-router-dom";

const App: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />}>
        <Route path="contacts" element={<RegisterForm />} />
      </Route>
    </Routes>
  );
};

export default App;
