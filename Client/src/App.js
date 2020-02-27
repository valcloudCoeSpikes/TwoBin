import React from 'react';
import Header from './components/generic/header';
import Footer from './components/generic/footer';
import Router from './components/routing/router';
import './css/App.css'
function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="container-fluid">
        {/* <div className="text mt-3 app"> */}
        
         <Router/>
        {/* </div> */}
      </div>
      <Footer />
      </React.Fragment>
  );
}

export default App;
