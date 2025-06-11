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

const peakAppLogo = `
  <table cellpadding="0" cellspacing="0" border="0" style="background:transparent;">
    <tr>
      <td style="vertical-align:middle;">
        <span style="
          font-family: Arial, Helvetica, sans-serif;
          font-weight: bold;
          font-size: 38px;
          color: #fff;
          letter-spacing: -2px;
          line-height: 1;
          background: transparent;
          display: inline-block;
          ">
          PeakApp
        </span>
      </td>
      <td style="vertical-align:middle; padding-left:18px;">
        <!-- SVG recreation of the provided PNG -->
        <svg width="90" height="30" viewBox="10 140 480 160" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
          <polygon style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);" points="19.454 284.437 90.432 195.058 128.286 211.882 193.481 154.574 222.398 178.759 240.274 169.295 302.314 216.614 351.21 186.646 406.415 220.82 426.919 205.573 480.021 252.366 426.919 222.923 437.435 246.583 355.416 200.841 318.087 218.191 352.261 275.499 240.8 178.759 222.924 190.326 194.007 167.718 123.555 296.004 123.555 222.922 94.112 209.253"/>
        </svg>
      </td>
    </tr>
  </table>
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
      ${peakAppLogo}
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
      ${peakAppLogo}
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
  try {
    const response = await resend.emails.send({
      from: 'info@slovakiaopen.online',
      to: email,
      subject: 'PeakApp: Your report has been resolved',
      html: reportEmailHtml(reportName, answer),
    })
    return response
  } catch (error) {
    throw error
  }
}
