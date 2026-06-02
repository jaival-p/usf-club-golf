import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { companyName, contactName, email, phone, website, package: pkg, notes, logoUrl } = await req.json();

    const emailBody = `
<h2>New Sponsorship Inquiry</h2>
<table>
  <tr><td><strong>Company:</strong></td><td>${companyName}</td></tr>
  <tr><td><strong>Contact:</strong></td><td>${contactName}</td></tr>
  <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
  <tr><td><strong>Phone:</strong></td><td>${phone || 'Not provided'}</td></tr>
  <tr><td><strong>Website:</strong></td><td>${website || 'Not provided'}</td></tr>
  <tr><td><strong>Package Selected:</strong></td><td>${pkg}</td></tr>
  <tr><td><strong>Logo:</strong></td><td>${logoUrl ? `<a href="${logoUrl}">View Logo</a>` : 'Not uploaded'}</td></tr>
</table>
<h3>Notes:</h3>
<p>${notes || 'None'}</p>
    `.trim();

    const subject = `New Sponsorship Inquiry — ${pkg} — ${companyName}`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'USF Club Golf <onboarding@resend.dev>',
        to: ['jaival@usf.edu'],
        subject,
        html: emailBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});