'use client'

import { NextPage } from "next";
import Image from "next/image";
import { Inter } from 'next/font/google'
import Spacer from "@/components/spacer";
import ThinkingEmoji from "public/images/pensando.gif"
import { useState } from "react";
import { formattedBalanceValue } from "../utils/formatBalanceValue";
import styles from "@/styles/recarga.module.scss"
import { useRouter } from "next/navigation";
import useUserData from "@/hooks/useUserData";

const inter = Inter({ subsets: ['latin'] })

const Recarga: NextPage = () => {
	const router = useRouter();
	const [valueToRecharge, setValueToRecharge] = useState("0")

	const handleRecharge = async (serialNumber: string, _valueToRecharge: string) => {
		await fetch(`http://127.0.0.1:3001/user/${serialNumber}/${_valueToRecharge}`, {
			method: "POST",
		})
		localStorage.setItem('userRecharge', JSON.stringify(valueToRecharge));
		router.push('/sucesso')
	}

	const userData = useUserData();
	if (!userData) {
		return <div>Carregando dados...</div>;
	}

	return (
		<div className={`${inter.className} ${styles.main}`}>
			<div className={styles.wrapper}>
				<Spacer height="60px" />
				<h2 className={styles.title}>
					Quanto você deseja recarregar?
				</h2>
				<Spacer height="34px" />
				<Image src={ThinkingEmoji} alt="Gif de Emoji pensando" className={styles.gifImage} />
				<Spacer height="65px" />
				<input
					type="text"
					value={valueToRecharge}
					onChange={(e) => setValueToRecharge(e.target.value)}
					placeholder="R$ 0,00"
					className={styles.input}
				/>
				<Spacer height="133px" />
				<button className={styles.confirm} onClick={() => handleRecharge(userData.data.serialNumber, valueToRecharge)}>confirmar</button>
			</div>

		</div>
	)
}

export default Recarga
