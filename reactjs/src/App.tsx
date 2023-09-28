import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux";
import Router from "@/router";

function App() {
	return (
		<ReduxProvider store={store}>
			<Router />
		</ReduxProvider>
	);
}

export default App;
