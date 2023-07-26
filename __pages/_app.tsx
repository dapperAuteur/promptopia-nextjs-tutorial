import type { AppProps } from 'next/app'
// import Nav from '@components/Nav';
// import Provider from '@components/Provider';
// import '@styles/globals.css';
import Script from 'next/script'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script aryel-embed-loader
        src="https://assets.aryel.io/embed-viewer/aryel-loader.js?apiKey=0bdf32266c06f48fc3b5d62dce4ecac5ad0012cb09d786ddd753546eb48ea60e9592a589e68b647ab48bf6c203f361d4&v=2" />
    </>
  )
}