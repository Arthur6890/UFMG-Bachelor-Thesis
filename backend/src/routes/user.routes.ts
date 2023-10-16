// src/routes/sectionRoutes.ts
import express, { Request, Response } from 'express';
import { User } from '../models/user.model';

const router = express.Router();

router.get('/user/:serialNumber', async (req: Request, res: Response) => {
	try {
		const serialNumber = req.params.serialNumber;
		const user = await User.findOne({ serialNumber: serialNumber });

		if (!user) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}

		return res.status(200).json({ data: user });
	} catch (error) {
		return res.status(500).json({ message: 'Erro ao buscar usuário' });
	}
});

router.post('/user/:serialNumber/:recharge', async (req: Request, res: Response) => {
	try {
		const { serialNumber, recharge } = req.params
		const user = await User.findOne({ serialNumber: serialNumber });

		if (!user) {
			res.status(404).json({ message: "Usuário não encontrado" });
		}
		else {
			user.balance = parseInt(recharge);
			await user.save()
			return res.status(200).json({ data: user });
		}

	} catch (error) {
		res.status(500).send('Erro ao realizar operação: ' + error);
	}
});

export default router;
