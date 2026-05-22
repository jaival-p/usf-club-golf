import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { companyName, contactName, email, phone, website, package: pkg, notes, logoUrl } = await req.json();

    const emailBody = `
New sponsorship inquiry received:

Company: ${companyName}
Contact: ${contactName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Website: ${website || 'Not provided'}
Package Selected: ${pkg}
Logo: ${logoUrl || 'Not uploaded'}

Notes:
${notes || 'None'}
    `.trim();

    const subject = `New Sponsorship Inquiry — ${pkg} — ${companyName}`;

    await Promise.all([
      base44.asServiceRole.integrations.Core.SendEmail({ to: 'lukerhodes2@usf.edu', subject, body: emailBody }),
      base44.asServiceRole.integrations.Core.SendEmail({ to: 'jaival@usf.edu', subject, body: emailBody }),
    ]);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});