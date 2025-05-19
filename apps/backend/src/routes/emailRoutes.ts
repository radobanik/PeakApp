import express from 'express'
import { sendTestEmail } from '../services/emailService'

const emailRouter = express.Router()

emailRouter.post('/test', async (req, res) => {
  try {
    await sendTestEmail()
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to send email' })
  }
})

export default emailRouter
