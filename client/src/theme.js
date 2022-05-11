import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export default extendTheme(withDefaultColorScheme({ colorScheme: 'purple' }), {
  fonts: {
    heading: 'Avenir, sans-serif',
    body: 'Source Sans Pro, sans-serif'
  },
  colors: {
    brand: {
      yellow: '#dfef0b',
      green: '#89c625',
      red: '#ff1654',
      purple: '#3a0058',
      gray: '#211f33'
    },
    soft: {
      yellow: '#f5fa9e',
      green: '#d5eeaa',
      red: '#ffc2d2',
      purple: '#f1d6ff',
      gray: '#e8e6ef'
    }
  },
});
