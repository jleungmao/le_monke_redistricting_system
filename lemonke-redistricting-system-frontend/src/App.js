import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
    return (
        <BrowserRouter>
            <Route exact path='/' component={HomePage}></Route>
        </BrowserRouter>
    )
}

export default App;
