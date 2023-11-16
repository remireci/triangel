import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";

// Function to generate HTML content for the email
function generateEmailContent(data) {
  const styles = `
  /* Define styles for the categories */
  // .result-category {
  //   margin-bottom: 10px;
  // }
  .section {
    margin-bottom: 25px;
  }  
  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
  }
  .red {
    background-color: red;
  }
  .orange {
    background-color: orange;
  }
  .yellow {
    background-color: yellow;
  }
  .green {
    background-color: green;
  }
`;

  const emailLink = `mailto:${data.email}`;

  const html = render(
    <html>
      <head>
        <style>{styles}</style>
      </head>
      <body>
      </body>
      <body>
        <div className="section">
          <h2>Kandidaat loopbaanbegeleiding</h2>
        </div>
        <div className="section">
          <p>
            Beste jobcoach,</p>
          <p>Via de Loopbaantest biedt zich een kandidaat voor begeleiding aan.</p>
          <p>Je kan de kandidaat contacteren op het volgende e-mailadres:</p>
          <p><a href={emailLink}>{data.email}</a></p>
        </div>
        <div className="section">
          <p>
            Hieronder vind je het resultaat van de test.
          </p>
        </div>

        {data.categoryData.map((category, index) => (
          <div key={index} className="result-category">
            <span className={`circle ${getCircleColor(category.result)}`}></span>
            <span>{category.category}: {category.result}</span>
          </div>
        ))}
      </body>
    </html>
  );

  return html;
}

// Function to determine the color class based on the result value
function getCircleColor(result) {
  if (result === -3) {
    return 'red';
  } else if (result === -2) {
    return 'orange';
  } else if (result === -1) {
    return 'yellow';
  } else if (result >= 0 && result <= 3) {
    return 'green';
  }
  return ''; // Default color or handle other cases
}

// Function to send emails
async function sendEmail(data) {
  const emailContent = generateEmailContent(data);
  const smtpOptions = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  // send the mail
  const transporter = nodemailer.createTransport(smtpOptions);

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log("Server is ready to take our messages");

    const mailData = {
      from: {
        name: `Reciproque`,
        address: "administrator@reciproque.eu",
      },
      replyTo: "",
      to: data.email,
      subject: "Loopbaantest: Aanvraag voor begeleiding",
      html: emailContent,
    };

    // Send mail
    const info = await transporter.sendMail(
      mailData);
    console.log("mail sent")
    // return { statusCode: 200, body: JSON.stringify({ message: "Email sent" }) };
  } catch (error) {
    console.error('Error sending email:', error);
    // return { statusCode: 500, body: JSON.stringify({ message: "Email could not be sent" }) };
  }
}

export async function POST(req, res) {
  
    try {
      const data = await req.json();
      // await sendEmail(data);

      const emailResult = await sendEmail(data);
      return NextResponse.json({ message: emailResult }, { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.error(error, { status: 500 });
    }  
}

