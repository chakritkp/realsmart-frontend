import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./routers";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider 
      autoHideDuration={3000}
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Router>
        <Routers />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
