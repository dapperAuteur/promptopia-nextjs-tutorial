import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import Head from 'next/head';
// import Nav from './../components/Nav'
// import Provider from './../components/Provider'
// import './../styles/globals.css'

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts"
}

const Rootlayout = ({children}) => {
  return (
    <html lang="en">
      <Head>
        <script src='/js/aryelEmbed.js' defer></script>
      </Head>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient'/>
          </div>
          <main className='app'>
            <Nav/>
            {children}
          </main>
          <aryel-embed
      campaign="63aaac153a8b4d43340287ea"></aryel-embed>
        </Provider>
      </body>
    </html>
  )
}

export default Rootlayout;