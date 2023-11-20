'use client'

import { NextPage } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formattedBalanceValue } from "../utils/formatBalanceValue";
import useUserRecharge from "@/hooks/useUserRecharge";
import Spacer from "@/components/spacer";
import Check from "public/images/check.gif"
import UfmgLogo from "public/images/ufmgLogo.png"
import styles from "@/styles/sucesso.module.scss"

const inter = Inter({ subsets: ['latin'] })

const Sucess: NextPage = () => {
	const recharge = useUserRecharge()
	const router = useRouter();

	const cleanLocalStorageAndGoBackToHome = () => {
		localStorage.clear()
		router.push('/')
	}

	return (
		<main className={`${inter.className} ${styles.main}`}>
			<div className={styles.wrapper}>
				<Spacer height="33px" />
				<h2 className={styles.title}>Recarga Finalizada!</h2>
				<Spacer height="60px" />
				<Image src={Check} alt="gif de um check" className={styles.check} />
				<Spacer height="70px" />
				<h3 className={styles.subtitle}>valor</h3>
				<h4 className={styles.rechargedValue} >{formattedBalanceValue(parseFloat(recharge))} </h4>
				<Spacer height="43px" />
				<button className={styles.confirm} onClick={() => cleanLocalStorageAndGoBackToHome()}>finalizar</button>
				<Image src={UfmgLogo} alt="Logo da UFMG" className={styles.ufmg} />
			</div>
		</main>

	)
}

export default Sucess