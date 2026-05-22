const RESEND_API_URL = 'https://api.resend.com/emails';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'USF Club Golf <onboarding@resend.dev>';
    const toEmails = (process.env.SPONSOR_INQUIRY_TO || 'lukerhodes2@usf.edu,jaivalpatel2005@gmail.com')
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean);

    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing RESEND_API_KEY environment variable.' }) };
    }

    const data = JSON.parse(event.body || '{}');
    const {
      companyName,
      contactName,
      email,
      phone,
      website,
      package: packageName,
      notes,
      logoFileName,
      logoAttachment,
    } = data;

    if (!companyName || !contactName || !email || !packageName) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields.' }) };
    }

    const subject = `New Sponsorship Inquiry — ${packageName} — ${companyName}`;
    const text = `New sponsorship inquiry received:\n\nCompany: ${companyName}\nContact: ${contactName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nWebsite: ${website || 'Not provided'}\nPackage Selected: ${packageName}\nLogo File: ${logoFileName || 'Not uploaded'}\n\nNotes:\n${notes || 'None'}`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111;">
        <h2>New Sponsorship Inquiry</h2>
        <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(contactName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Website:</strong> ${escapeHtml(website || 'Not provided')}</p>
        <p><strong>Package Selected:</strong> ${escapeHtml(packageName)}</p>
        <p><strong>Logo File:</strong> ${escapeHtml(logoFileName || 'Not uploaded')}</p>
        <h3>Notes</h3>
        <p>${escapeHtml(notes || 'None').replace(/\n/g, '<br>')}</p>
      </div>
    `;

    const payload = {
      from: fromEmail,
      to: toEmails,
      reply_to: email,
      subject,
      text,
      html,
    };

    if (logoAttachment?.content && logoAttachment?.filename) {
      payload.attachments = [
        {
          filename: logoAttachment.filename,
          content: logoAttachment.content,
        },
      ];
    }

    const resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      return { statusCode: resendResponse.status, headers, body: JSON.stringify({ error: resendData.message || 'Resend email failed.' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true, id: resendData.id }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message || 'Server error.' }) };
  }
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
