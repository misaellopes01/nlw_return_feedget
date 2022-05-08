import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from "./prisma";
import { NodemailerMailProvider } from './providers/nodemailer/NodemailerMailProvider';
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';
export const routes = express.Router()




routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailProvider = new NodemailerMailProvider()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailProvider
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })
    

    return res.status(201).send()
})