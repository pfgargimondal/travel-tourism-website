import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


import { Footer, Header } from './component';


import Allroutes from './routes/Allroutes';


import './App.css';



function App() {
  const [headerNew, setHeaderNew] = useState(false);
  
  const pathName = useLocation().pathname;  

  useEffect(() => {
    const isHeaderNewIncluded = ["/thank-you", "/user-profile", "/account-information", "/user-booking", "/change-password", "/wishlist"].some(path => pathName.includes(path));

    isHeaderNewIncluded ? setHeaderNew(true) : setHeaderNew(false);
  }, [pathName]);



  return (
    <div className="App">
      <Header headerNew={headerNew} />  
        {/* <div className="middle-wrapper"> */}
        
        <main className={ headerNew ? "mt-0" : "" }>
          <Allroutes/>
        </main>

        {/* </div>       */}
        <Footer/>
    </div>
  );
}

export default App;
