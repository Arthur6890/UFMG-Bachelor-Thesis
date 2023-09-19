// src/routes/sectionRoutes.ts
import { Router, Request, Response } from 'express';
import Section, { ISection } from '../models/Section';

const router = Router();

router.get('/section/:serialNumber', async (req: Request, res: Response) => {
  try {
    const { serialNumber } = req.params;
    const section: ISection | null = await Section.findOne({ serialNumber });

    if (!section) {
      return res.status(404).json({ message: 'Seção não encontrada' });
    }

    res.json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a seção' });
  }
});

export default router;
