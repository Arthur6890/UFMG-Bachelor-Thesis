import React, { FC } from "react";
import styles from "./styles.module.scss"

type Props = {
	text: string
	href: string
	lineHeight?: string
	fontSize: string
}

export const ButtonComponent: FC<Props> = ({ text, href, lineHeight, fontSize }) => {
	return (
		<div className={styles.main}>
			<a href={href} className={styles.button} style={{ lineHeight, fontSize }}>
				{text}
			</a>
		</div>
	)
}