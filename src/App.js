import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


import { Footer, Header } from './component';


import Allroutes from './routes/Allroutes';


import './App.css';



function App() {
  const [headerNew, setHeaderNew] = useState(false);
  const [headerBlackText, setHeaderBlackText] = useState(false);
  
  const pathName = useLocation().pathname;  

  useEffect(() => {
    const isHeaderNewIncluded = ["/thank-you", "/user-profile", "/account-information", "/user-booking", "/change-password", "/wishlist"].some(path => pathName.includes(path));
    const isHeaderBlackTextIncluded = ["/hotel-booking", "/hotel-payment"].some(path => pathName.includes(path));

    isHeaderNewIncluded ? setHeaderNew(true) : setHeaderNew(false);
    isHeaderBlackTextIncluded ? setHeaderBlackText(true) : setHeaderBlackText(false) ;
  }, [pathName]);



  return (
    <div className="App">
      <Header headerNew={headerNew} headerBlackText={headerBlackText} />  
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
