'use client'

import { NextPage } from "next";
import Greetings from "@/components/greetings";
import Spacer from "@/components/spacer";
import { Inter } from 'next/font/google'
import { ButtonComponent } from "@/components/button";
import useUserData from "@/hooks/useUserData";
import styles from "@/styles/dados.module.scss"
import { capitalizeString } from "../utils/capitalizeString";
import { formattedBalanceValue } from "../utils/formatBalanceValue";

const inter = Inter({ subsets: ['latin'] })

const Dados: NextPage = () => {

	const userData = useUserData();
	if (!userData) {
		return <div>Carregando dados...</div>;
	}

	return (
		<main className={`${inter.className} ${styles.main}`}>

			<div className={styles.wrapper}>
				<div className={styles.header}>
					<div className={styles.greetings}>
						<Spacer height="33px" />
						<Greetings />
						<h2 className={`${inter.className} ${styles.name}`}>
							{`${capitalizeString(userData.data.name)}!`}
						</h2>
					</div>
					<div className={styles.profileFotoDiv}>
						<img src={userData.data.profilePhoto} alt={`foto de perfil de ${capitalizeString(userData.data.name)}`} className={styles.profileFoto} />

					</div>
				</div>
				<div className={styles.balance}>
					<Spacer height="140px" />
					<h2 className={styles.balanceInfo}>
						seu saldo atual é:
					</h2>
					<Spacer height="34px" />
					<h2 className={styles.balanceNumbers}>
						{`${formattedBalanceValue(userData.data.balance)}`}
					</h2>
				</div>
				<Spacer height="182px" />
				<ButtonComponent lineHeight="30px" fontSize='25px' href='/recarga' text='fazer recarga' />

			</div>
		</main>
	)
}

export default Dados