import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export default extendTheme(withDefaultColorScheme({ colorScheme: 'purple' }), {
  styles: {
    global: {
      'html, body, th': {
        'fontFamily': 'Source Sans Pro'
      }
    },
  },
  colors: {
    'brand-purple': '#3a0058',
  },
});
