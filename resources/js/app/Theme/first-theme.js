// import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#e6a751',
      },
      secondary: {
        main: '#10492f',
      },
      text: {
          primary: '#10492f',
          secondary: '#2c3e46',

      } 
    },
    typography: {
        fontFamily: ['Quicksand',
        'Arial',
        'sans-serif',
        ].join(','),
        fontSize: 14,
        
        h1: {
            fontFamily: ['Staatliches',
            'Arial',
            ].join(','),
            fontSize: '6rem',
            fontWeight: '500',
        },

        h3: {
            fontFamily: ['Staatliches',
            'Arial',
            ].join(','),
            fontSize: '1.5rem',
            fontWeight: '500',
            
        }
    },

  });

export default theme;
