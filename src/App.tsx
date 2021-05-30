import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CompanyList from "./pages/CompanyList";
import NewCompany from "./pages/NewCompany";
import Company from "./pages/Company";
import NewUser from "./pages/NewUser";
import User from "./pages/User";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CompanyList} />
          <Route path="/new-company" component={NewCompany} />
          <Route path="/company/:_id" component={Company} />
          <Route path="/new-user/:_id" component={NewUser} />
          <Route path="/user/:_id" component={User} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
