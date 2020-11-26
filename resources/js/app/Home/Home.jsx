import React, {useState, useEffect} from 'react';
import Search from '../Search/Search';

export default function Home() {
   return(
      <>
         <div className="home">
         <h1>Home</h1>
            <Search />
         </div>
         
      </>
   );
}