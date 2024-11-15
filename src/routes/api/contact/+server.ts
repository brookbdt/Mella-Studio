// src/routes/api/contact/+server.js
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { MAIL_AUTH_PASS, MAIL_AUTH_USER } from '$env/static/private';

export async function POST({ request }) {
    const { name, phoneNumber, message } = await request.json();

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Changed to use Gmail service directly
        auth: {
            user: MAIL_AUTH_USER,
            pass: MAIL_AUTH_PASS
        }
    });

    const mailOptions = {
        from: MAIL_AUTH_USER,
        to: 'mellastudio07@gmail.com',
        subject: 'Website Message - Mella Studio',
        html: `
            <h2>Website Message - Mella Studio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        return json({
            success: false,
            message: 'Failed to send message. Please try again.'
        }, { status: 500 });
    }
}