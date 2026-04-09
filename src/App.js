import './App.css';
import { Footer, Header } from './component';
import Allroutes from './routes/Allroutes';

function App() {
  return (
    <div className="App">
      <Header/>  
        {/* <div className="middle-wrapper"> */}
          <Allroutes/>
        {/* </div>       */}
        <Footer/>
    </div>
  );
}

export default App;
