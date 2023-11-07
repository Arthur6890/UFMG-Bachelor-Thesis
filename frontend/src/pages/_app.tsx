import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Carregue sua carteirinha</title>
				<meta name="description" content="Sistema para carregar carteirinha da UFMG - by Arthur Ramos" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}
