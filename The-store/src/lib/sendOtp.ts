import nodemailer from 'nodemailer';

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"The-Store" <no-reply@The-Store.com',
      to: email,
      subject: "Your Verification Code",
      html: `<p>Your verification code is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    console.log("OTP Email sent successfully to:", email , "OTP is " , otp);
    
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    // This throw is important! It will cause the parent transaction to fail and roll back.
    throw new Error("Failed to send verification email.");
  }
}
