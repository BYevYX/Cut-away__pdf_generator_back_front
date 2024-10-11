import { Router } from "express";
import generatePdfRouter from "./generatePdfRouter";
import downloadPdfRouter from "./downloadRouter";

const router = Router();

router.use('/pdf', generatePdfRouter);
router.use('/pdf', downloadPdfRouter);

export default router;
