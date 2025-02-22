import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";
import { configDotenv } from "dotenv";
configDotenv();
export const subscribeNewsLetter = asyncHandler(async (userData)=>{

    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        service:'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_APP_PASSWORD,
          }
        
    });

    let mailOptions = {
        from:process.env.NODEMAILER_EMAIL,
        to:[userData?.email,"shashanknegi@pearlorgainsation.com"],
        subject:'Welcome To Perfumetrics',
        html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfumetrics Newsletter</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #fce4ec; /* Light pink background */
            font-family: Arial, sans-serif;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff; /* White background for the email content */
            border: 1px solid #f8bbd0; /* Light pink border */
            border-radius: 5px;
            overflow: hidden;
        }
        .header {
            background-color: #ec407a; /* Darker pink header */
            color: #ffffff;
            text-align: center;
            padding: 20px 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .content h2 {
            color: #ec407a; /* Use the same pink for headings */
        }
        .content p {
            line-height: 1.6;
            color: #333333;
        }
        .footer {
            background-color: #f8bbd0; /* Light pink footer */
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #999999;
        }
        @media only screen and (max-width: 600px) {
            .header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Perfumetrics</h1>
        </div>
        <div class="content">
            <h2>Welcome to Our Newsletter!</h2>
            <p>Dear Subscriber,</p>
            <p>Thank you for subscribing to Perfumetrics! We are thrilled to have you on board. In our newsletter, you will find the latest perfume reviews, fragrance tips, and special offers tailored just for you.</p>
            <p>Stay tuned for updates that will help you discover your next favorite scent!</p>
            <p>Happy scent hunting!</p>
        </div>
        <div class="footer">
            <p>You are receiving this email because you subscribed to our newsletter. If you wish to unsubscribe, click <a href="${process.env.NEWSLETTER_UNSUBSCRIBE_URL}?email=${userData?.email}">here</a>.</p>
            <p>&copy; 2025 Perfumetrics. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`
    };

    const info = await transporter.sendMail(mailOptions);
    return info ;
    
})