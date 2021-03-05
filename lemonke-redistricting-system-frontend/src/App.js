import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
    return (
        <>
        <div id = 'map'>
            <BrowserRouter>
                <Route exact path='/' component={HomePage}></Route>
            </BrowserRouter>
        </div>
        </>
    )
}

export default App;
