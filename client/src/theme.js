import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export default extendTheme(withDefaultColorScheme({ colorScheme: 'purple' }), {
  fonts: {
    heading: 'Source Sans Pro, sans-serif',
    body: 'Source Sans Pro, sans-serif'
  },
  colors: {
    'brand-purple': '#3a0058',
  },
});
