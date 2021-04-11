import { sendEmail, sendEmails, setEmail } from "../../helpers/emails";
class EmailController {
    static async sendEmail(req, res) {
        try {
            const { message, email, subject } = req.body;
            await sendEmail(
                setEmail(
                    process.env.EMAIL,
                    email,
                    subject,
                    message
                )
            ).then((result) => {
                return res.status(201).json({ msg: "Email sent successfuly" })
            }).catch((error) => {
                return res.status(500).json({ error: "Can't send email", err: error })
            })
        } catch (error) {
            return res.status(400).json({ error: "Something went wrong", err: error })
        }
    }
    static async sendEmails(req, res) {
        try {
            const { message, emails, subject } = req.body;
            await sendEmails(
                emails,
                setEmail(
                    process.env.EMAIL,
                    null,
                    subject,
                    message
                )
            ).then((result) => {
                return res.status(201).json({ msg: "Emails sent successfuly" })
            }).catch((error) => {
                return res.status(500).json({ error: "Can't send emails", err: error })
            })
        } catch (error) {
            return res.status(400).json({ error: "Something went wrong", err: error })
        }
    }
}

export default EmailController;