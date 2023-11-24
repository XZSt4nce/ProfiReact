import {ContextWrapper} from "../../core/Context";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Routes} from "../constants/routes";
import {Layout} from "../components/HOCs/Layout";

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <ContextWrapper>
                <Layout>
                    {Routes.map((route, idx) => (
                        <Route key={idx} path={route.path} exact>
                            {<route.page />}
                        </Route>
                    ))}
                </Layout>
            </ContextWrapper>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
