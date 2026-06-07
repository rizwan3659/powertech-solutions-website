import { Resend } from "resend";

// Initialize Resend with API key from env (or a dummy key for build time)
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

// Ensure the "from" address is verified in your Resend account!
// Usually something like "onboarding@resend.dev" for testing, or "admin@yourdomain.com"
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@powertech.com"; // Your receiving email

export async function sendNewLeadEmail(leadData: any) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Mocking lead email:", leadData);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: `PowerTech Leads <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `New Lead: ${leadData.name} - ${leadData.enquiryType}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Mobile:</strong> ${leadData.mobile}</p>
        <p><strong>Enquiry Type:</strong> ${leadData.enquiryType}</p>
        <p><strong>Message:</strong> ${leadData.message}</p>
        <br/>
        <a href="https://powertech-nine.vercel.app/admin/leads">View in Admin Portal</a>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error sending lead email:", error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Mocking reset email for:", email, "Link:", resetLink);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: `PowerTech Admin <${FROM_EMAIL}>`,
      to: [email],
      subject: "Password Reset Request",
      html: `
        <h2>Reset Your Password</h2>
        <p>We received a request to reset the password for your PowerTech Admin account.</p>
        <p>Click the link below to securely reset your password. If you didn't request this, you can safely ignore this email.</p>
        <br/>
        <a href="${resetLink}" style="padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error sending reset email:", error);
    return { success: false, error };
  }
}
