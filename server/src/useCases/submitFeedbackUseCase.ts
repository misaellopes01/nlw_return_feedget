import { MailProvider } from "../providers/MailProvider"
import { FeedbackRepository } from "../repositories/FeedbackRepository"

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbackRepository,
        private mailProvider: MailProvider
    ){}

    async execute({ type, comment, screenshot  }: SubmitFeedbackUseCaseRequest){

        if (!type) {
            throw new Error("Type is required!")
        }

        if (!comment) {
            throw new Error("Comment is required!")
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }
        
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailProvider.sendMail({
            subject: 'Novo Feedback!',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                    `<p>Tipo do feedback: ${type}</p>`,
                    `<p>Comentario: ${comment}</p>`,
                    screenshot ? `<img src="${screenshot}">` : ``,
                `</div>`
            ].join('\n')
        })

    }
}