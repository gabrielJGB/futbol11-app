import { ThemeProvider } from './src/context/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => (
  <ThemeProvider>
    <RootNavigator />
  </ThemeProvider>
);


export default App
