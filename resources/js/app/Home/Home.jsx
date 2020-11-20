import React, {useState, useEffect} from 'react';
import ListAllRoutes from '../ListAllRoutes/ListAllRoutes';

export default function Home() {
   return(
      <>
         <h1>Home - list of all routes</h1>
         <ListAllRoutes />
      </>
   );
}