import React, {useState, useEffect} from 'react';
import ListAllRoutes from '../ListAllRoutes/ListAllRoutes';
import Search from '../Search/Search';

export default function Home() {
   return(
      <>
         <h1>Home - list of all routes</h1>
         <Search />
      </>
   );
}