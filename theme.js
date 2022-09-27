import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export default extendTheme(withDefaultColorScheme({ colorScheme: 'purple' }), {
  fonts: {
    heading: 'Avenir, sans-serif',
    body: 'Source Sans Pro, sans-serif',
  },
  colors: {
    brand: {
      100: 'rgba(241, 214, 255, 0.5)',
      500: '#3a0058',
      600: '#AE88EB'
    },
    normal: {
      yellow: '#dfef0b',
      green: '#89c625',
      red: '#ff1654',
      purple: '#3a0058',
      gray: '#211f33',
      black: '#000',
      white: '#FFF',
    },
    soft: {
      yellow: '#f5fa9e',
      green: '#d5eeaa',
      red: '#ffc2d2',
      purple: '#f1d6ff',
      gray: '#e8e6ef',
    },
    softer: {
      yellow: 'rgba(245, 250, 158, 0.5)',
      green: 'rgba(213, 238, 170, 0.7)',
      red: 'rgba(255, 194, 210, 0.5)',
      purple: 'rgba(241, 214, 255, 0.5)',
      gray: '#F7F6F8',
    },
  },
});
