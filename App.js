import { ThemeProvider } from './src/context/ThemeContext';
import { AppProvider } from './src/context/AppContext'
import RootNavigator from './src/navigation/RootNavigator';

const App = () => (
  <ThemeProvider>
    <AppProvider >
      <RootNavigator />
    </AppProvider>
  </ThemeProvider>
);


export default App
