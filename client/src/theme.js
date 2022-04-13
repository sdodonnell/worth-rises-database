import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export default extendTheme(withDefaultColorScheme({ colorScheme: 'purple' }), {
  colors: {
    'brand-purple': '#3a0058',
  },
});
