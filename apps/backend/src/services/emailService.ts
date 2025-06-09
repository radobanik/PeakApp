import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTestEmail = async () => {
  try {
    const response = await resend.emails.send({
      from: 'info@slovakiaopen.online',
      to: 'sneakyspider1337@gmail.com',
      subject: 'PeakApp: Hello World',
      html: likeEmailHtml('Jozko Mrkvicka', 'Climbing session with Marek'),
    })
    return response
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

const baseStyles = `
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 12px;
  max-width: 500px;
  margin: auto;
  text-align: center;
  border: 1px solid #ddd;
`

const likeEmailHtml = (username: string, sessionName?: string) => `
  <div style="${baseStyles}">
    <h2 style="color:#1e90ff;">👏 Someone liked your session!</h2>
    <p><strong>${username}</strong> just gave you a like${sessionName ? ` on <strong>${sessionName}</strong>` : ''}.</p>
    <p style="font-size:14px; color:#777;">Keep crushing those routes 🧗‍♂️</p>

    <div style="margin-top:20px;">
      <a href="https://your-app.com/sessions" style="
        background:#1e90ff;
        color:white;
        padding:10px 20px;
        text-decoration:none;
        border-radius:6px;
        font-weight:bold;
        display:inline-block;">
        View session
      </a>
    </div>

    <div style="margin-top:30px;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Strava_Logo.svg/2560px-Strava_Logo.svg.png" alt="ClimbApp Logo" style="width:100px; opacity:0.6;" />
    </div>
  </div>
`

const commentEmailHtml = (username: string, sessionName?: string) => `
  <div style="${baseStyles}">
    <h2 style="color:#28a745;">💬 New comment received!</h2>
    <p><strong>${username}</strong> left a comment${sessionName ? ` on <strong>${sessionName}</strong>` : ''}.</p>
    <p style="font-size:14px; color:#777;">Check it out and join the conversation 🔥</p>

    <div style="margin-top:20px;">
      <a href="https://your-app.com/sessions" style="
        background:#28a745;
        color:white;
        padding:10px 20px;
        text-decoration:none;
        border-radius:6px;
        font-weight:bold;
        display:inline-block;">
        View comment
      </a>
    </div>

    <div style="margin-top:30px;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Strava_Logo.svg/2560px-Strava_Logo.svg.png" alt="ClimbApp Logo" style="width:100px; opacity:0.6;" />
    </div>
  </div>
`

const reportEmailHtml = (reportName: string, answer: string) => `
  <div style="${baseStyles}">
    <h2 style="color:#28a745;">💬 Your report <strong>${reportName}</strong> has been resolved!</h2>
    <p>Our administration team has received the report, identified the issue, and resolved it.</p>
    <br>
    <p style="font-size:14px; color:#777;"><strong>Resolver answer:</strong></p>
    <p>${answer}</p>

    <div style="margin-top:30px;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Strava_Logo.svg/2560px-Strava_Logo.svg.png" alt="ClimbApp Logo" style="width:100px; opacity:0.6;" />
    </div>
  </div>
`

export const sendLikeEmail = async (name: string, email = 'sneakyspider1337@gmail.com') => {
  try {
    const response = await resend.emails.send({
      from: 'info@slovakiaopen.online',
      to: email,
      subject: 'PeakApp: New Like under one of your sessions',
      html: likeEmailHtml(name),
    })
    return response
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

export const sendCommentEmail = async (name: string, email = 'sneakyspider1337@gmail.com') => {
  try {
    const response = await resend.emails.send({
      from: 'info@slovakiaopen.online',
      to: email,
      subject: 'PeakApp: New Comment under one of your sessions',
      html: commentEmailHtml(name),
    })
    return response
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

export const sendReportEmail = async (reportName: string, answer: string, email: string) => {
  console.log('Sending report email', { reportName, answer, email })
  try {
    const response = await resend.emails.send({
      from: 'info@slovakiaopen.online',
      to: email,
      subject: 'PeakApp: Your report has been resolved',
      html: reportEmailHtml(reportName, answer),
    })
    return response
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}
