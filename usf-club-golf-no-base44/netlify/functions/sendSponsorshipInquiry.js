export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.SPONSOR_INQUIRY_TO;

    if (!resendApiKey) throw new Error("Missing RESEND_API_KEY environment variable.");
    if (!toEmail) throw new Error("Missing SPONSOR_INQUIRY_TO environment variable.");

    const recipients = toEmail.split(",").map((email) => email.trim()).filter(Boolean);

    const emailHtml = `
      <h2>New Sponsorship Inquiry</h2>
      <p><strong>Company:</strong> ${data.companyName || "N/A"}</p>
      <p><strong>Contact:</strong> ${data.contactName || "N/A"}</p>
      <p><strong>Email:</strong> ${data.email || "N/A"}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Website:</strong> ${data.website || "N/A"}</p>
      <p><strong>Package:</strong> ${data.package || data.selectedPackage || "N/A"}</p>
      <p><strong>Logo File:</strong> ${data.logoFileName || "Not uploaded"}</p>
      <p><strong>Notes:</strong> ${data.notes || "N/A"}</p>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipients,
        reply_to: data.email || undefined,
        subject: "New Club Golf at USF Sponsorship Inquiry",
        html: emailHtml,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: result.message || "Failed to send email", details: result }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
