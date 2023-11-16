'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import EviteFilas from "public/images/eviteFilas.png"
import ReacregueAqui from "public/images/recarregueAqui.png"
import IconeTCC from "public/images/icon.png"
import { ButtonComponent } from '@/components/button'
import Spacer from '@/components/spacer'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/home.module.scss'
import { User } from '@/interface/Iuser'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const router = useRouter();
	const [serialNumber, setserialNumber] = useState('');

	const handleLogin = async (serialNumber: string) => {
		try {
			const response = await fetch(`http://127.0.0.1:3001/user/${serialNumber}`, {
				method: "GET",
			})
			const user: User = await response.json();
			localStorage.setItem('userData', JSON.stringify(user));
			router.push('/dados')
		} catch (e) {
			console.log("Erro!", e);
		}
	};



	return (
		<main className={`${inter.className} ${styles.main}`}>
			<Image src={EviteFilas} alt='Evite Filas!' className={styles.title} />
			<Image src={ReacregueAqui} alt='Recarregue sua carteirinha aqui!' className={styles.subtitle} />
			<Image src={IconeTCC} alt='Recarregue sua carteirinha aqui!' className={styles.icon} />
			<Spacer height='20px' />
			<ButtonComponent lineHeight="20px" fontSize='16px' href='/dados' text='aproxime sua carteirinha do sensor' />

			<input
				type="text"
				value={serialNumber}
				onChange={(e) => setserialNumber(e.target.value)}
				placeholder="Digite o serialNumber"
			/>
			<button onClick={() => handleLogin(serialNumber)}>Buscar</button>

		</main>
	)
}
