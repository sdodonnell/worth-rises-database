import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../index.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
