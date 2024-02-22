import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import fs from "fs/promises";
import path from "path";

// Function to generate HTML content for the email
function generateEmailContent(data, questions) {
  const styles = `
  /* Define styles for the categories */
  // .result-category {
  //   margin-bottom: 10px;
  // }
  .section {
    margin-bottom: 25px;
  }
  .category {
    font-weight: bold;
    margin-bottom: 5px;
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
  .blue {
    background-color: blue;
  }
`;

  const emailLink = `mailto:${data.email}`;

  // construct new array adding the questions to the answers
  let answers = [];

  for (let i = 6; i < 24; i++) {
    const answer = data.categoryData[i];
    const questionObject = questions.find(obj => obj.id === answer.id);
    answer.question = questionObject.question;
    answer.category = questionObject.category;
    answers.push(answer);
  }

  let i = 0
  while (i < 16) {
    if (answers[i].category === answers[i + 1].category) {
      answers[i].answer1 = answers[i + 1].answer;
      answers[i].question1 = answers[i + 1].question;
      answers[i].answer2 = answers[i + 2].answer;
      answers[i].question2 = answers[i + 2].question;
      i = i + 3;
    }
  }

  let answersReduced = []

  for (let i = 0; i < 16; i = i + 3) {
    answersReduced.push(answers[i]);
  }

  // mail content for coach center
  const htmlCoach = render(
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
          <p><strong>Dit zijn de contactgegevens van de kandidaat:</strong></p>
          <p>Naam: {data.name}</p>
          <p>Voornaam: {data.firstName}</p>
          <p>Telefoonnummer: {data.phone}</p>
          <p>Postcode: {data.postalCode}</p>
          <p><a href={emailLink}>Mail: {data.email}</a></p>
        </div>
        <div className="section">
          <p><strong>Hieronder vind je het resultaat van de test.</strong></p>
        </div>

        <div className="section">
          {data.categoryData.slice(0, 6).map((category, index) => (
            <div key={index} className="result-category">
              <span className={`circle ${getCircleColor(category.result)}`}></span>
              <span>{category.category}: {category.result}</span>
            </div>
          ))}
        </div>
        <div className="section">
          {answersReduced.map((answer, index) => (
            <div key={index} className="result-answer">
              <div>
                <span className="category">{answer.category}</span>
              </div>
              <div>
                <p>
                  <span className="">{answer.question}: {answer.answer}</span>
                </p>
                <p>
                  <span className="">{answer.question1}: {answer.answer1}</span>
                </p>
                <p>
                  <span className="">{answer.question2}: {answer.answer2}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </body>
    </html>
  );

  // const htmlClient = render(
  //   <html>
  //     <head>
  //       <style>{styles}</style>
  //     </head>
  //     <body>
  //     </body>
  //     <body>
  //       <div className="section">
  //         <h2>Resultaat Loopbaantest Triangel</h2>
  //       </div>
  //       <div className="section">
  //         <p>
  //           Beste,</p>
  //         <p>De resultaten hieronder geven aan of loopbaanbegeleiding je situatie kan helpen verbeteren.</p>
  //         <p>Je hebt je mailadres doorgegeven aan Triangel Loopbaanbegeleiding. Je zal snel worden gecontacteerd
  //           door een jobcoach.
  //         </p>
  //         <p>
  //           Wil je zelf contact opnemen? Dat kan op het volgende mailadres:
  //         </p>
  //         <p><a href="mailto:info@triangelloopbaancentrum.be">info@triangelloopbaancentrum.be</a></p>
  //       </div>

  //       {data.categoryData.slice(0, 6).map((category, index) => (
  //         <div key={index} className="result-category">
  //           <span className={`circle ${getCircleColor(category.result)}`}></span>
  //           <span>{category.category}: {category.result}</span>
  //         </div>
  //       ))}
  //     </body>
  //   </html>
  // );

  return { htmlCoach };
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
  } else if (result === 5) {
    return 'blue';
  }
  return ''; // Default color or handle other cases
}

// Function to send emails
async function sendEmail(data, questions) {
  const { htmlCoach } = generateEmailContent(data, questions);
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

    const mailDataCoach = {
      from: {
        name: `Triangel Loopbaantest`,
        address: "info@triangel-loopbaantest.be",
      },
      replyTo: "",
      to: ["dirk_mertens@fastmail.fm"],
      subject: "Loopbaantest: Aanvraag voor begeleiding",
      html: htmlCoach,
    };

    // const mailDataClient = {
    //   from: {
    //     name: `Triangel Loopbaantest`,
    //     address: "info@loopbaantest-vlaanderen.be",
    //   },
    //   replyTo: "",
    //   to: [data.email], // Use the client's email from the received data
    //   subject: "Loopbaantest: Resultaat",
    //   html: htmlClient,
    // };

    // Send mail
    await Promise.all([
      transporter.sendMail(mailDataCoach),
      // transporter.sendMail(mailDataClient),
    ]);
    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    // return { statusCode: 500, body: JSON.stringify({ message: "Email could not be sent" }) };
  }
}

export async function POST(req, res) {

  try {
    const data = await req.json();
    // await sendEmail(data);

    // Read questions data from file
    const questionsPath = path.resolve('app', 'data', 'questions.json');
    const questionsData = await fs.readFile(questionsPath, 'utf-8');
    const questions = JSON.parse(questionsData);

    const answersPath = path.resolve('app', 'data', 'answers.json');
    const answersData = await fs.readFile(answersPath, 'utf-8');
    const answers = JSON.parse(answersData);

    const emailResult = await sendEmail(data, questions, answers);
    return NextResponse.json({ message: emailResult }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error(error, { status: 500 });
  }
}

