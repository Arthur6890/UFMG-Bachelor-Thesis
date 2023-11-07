import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss'

const Greetings: React.FC = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [greeting, setGreeting] = useState<string>('');

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		const currentHour = currentTime.getHours();

		if (currentHour >= 6 && currentHour < 12) {
			setGreeting('Bom dia');
		} else if (currentHour >= 12 && currentHour < 18) {
			setGreeting('Boa tarde');
		} else {
			setGreeting('Boa noite');
		}
	}, [currentTime]);

	return (
		<h1 className={styles.main}>{`${greeting},`}</h1>
	);
}

export default Greetings;
