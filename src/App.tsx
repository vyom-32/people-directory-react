import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import PersonList from "./components/PersonList";
import UserForm from "./components/UserForm";
import DeletedPersonList from "./components/DeletedPersonList";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul className="flex gap-4 font-semibold flex-wrap justify-center mt-3">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  (isActive
                    ? "bg-slate-600 text-white"
                    : "bg-gray-200 text-black") + " py-2 px-4 rounded shadow-md"
                }
                end
              >
                List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-new"
                className={({ isActive }) =>
                  (isActive
                    ? "bg-slate-600 text-white"
                    : "bg-gray-200 text-black") + " py-2 px-4 rounded shadow-md"
                }
              >
                Add New
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/deleted"
                className={({ isActive }) =>
                  (isActive
                    ? "bg-slate-600 text-white"
                    : "bg-gray-200 text-black") + " py-2 px-4 rounded shadow-md"
                }
              >
                Deleted
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<PersonList />} />
          <Route path="/add-new" element={<UserForm />} />
          <Route path="/deleted" element={<DeletedPersonList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
