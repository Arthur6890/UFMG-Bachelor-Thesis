'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import EviteFilas from "public/images/eviteFilas.png"
import ReacregueAqui from "public/images/recarregueAqui.png"
import IconeTCC from "public/images/icon.png"
import { ButtonComponent } from '@/components/button'
import Spacer from '@/components/spacer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserProvider, useUser } from '@/context/UserContext'
import styles from '@/styles/home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [serialNumber, setSerialNumber] = useState('');
	const router = useRouter();
	const user = useUser();


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// if (fetchUser) {
		// 	fetchUser(serialNumber);
		// }

		// router.push('/dados');
		console.log(user?.balance)
	};


	return (
		<UserProvider>
			<main className={`${inter.className} ${styles.main}`}>
				<Image src={EviteFilas} alt='Evite Filas!' className={styles.title} />
				<Image src={ReacregueAqui} alt='Recarregue sua carteirinha aqui!' className={styles.subtitle} />
				<Image src={IconeTCC} alt='Recarregue sua carteirinha aqui!' className={styles.icon} />
				<Spacer height='20px' />
				<ButtonComponent lineHeight="20px" fontSize='16px' href='/dados' text='aproxime sua carteirinha do sensor' />

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={serialNumber}
						onChange={(e) => setSerialNumber(e.target.value)}
						placeholder="Digite o serialNumber"
					/>
					<button type="submit">Buscar</button>
				</form>

			</main>
		</UserProvider>
	)
}
