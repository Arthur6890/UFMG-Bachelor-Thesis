'use client'

import { NextPage } from "next";
import Greetings from "@/components/greetings";
import Spacer from "@/components/spacer";
import Image from "next/image";
import Foto from "public/images/desktop.jpg"
import { Inter } from 'next/font/google'
import { userMocked } from "@/mock/user";
import { ButtonComponent } from "@/components/button";
import styles from "@/styles/dados.module.scss"
import { User } from "@/interface/Iuser";
import useUserData from "@/hooks/useUserData";

const inter = Inter({ subsets: ['latin'] })

const Dados: NextPage = () => {
	function capitalizeString(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function formattedBalanceValue(number: number) {
		const formattedNumber = number.toLocaleString('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
		});

		return formattedNumber;
	}

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
					<Image src={Foto} alt={`foto de perfil de ${capitalizeString(userMocked.name)}`} className={styles.profileFoto} />
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