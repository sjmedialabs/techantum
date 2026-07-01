import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface ContactEmailData {
  name: string;
  country: string;
  email: string;
  phone: string;
  productCategory: string;
  quantity: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildContactEmailHtml(data: ContactEmailData): string {
  const rows = [
    ['Full Name', data.name],
    ['Country', data.country],
    ['Email Address', data.email],
    ['Phone Number', data.phone],
    ['Service Required', data.productCategory],
    ['Timeline / Budget', data.quantity],
    ['Additional Message', data.message || '—'],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#374151;width:180px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#000000,#EF4323);padding:28px 32px;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.85);">TechAntum</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Project Inquiry</h1>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.9);">Submitted via techantum.com contact form</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
                Dear Team,<br><br>
                A prospective client has submitted a project inquiry. Please review the details below and respond within 24 hours.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:4px;border-collapse:collapse;">
                ${tableRows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 28px;">
              <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">
                Reply directly to <a href="mailto:${escapeHtml(data.email)}" style="color:#EF4323;">${escapeHtml(data.email)}</a> to continue the conversation.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
                TechAntum · Digital Solutions · info@techantum.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendContactNotification(data: ContactEmailData): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    return { ok: false, error: 'RESEND_API_KEY is not configured' };
  }

  const to = process.env.CONTACT_INBOX || 'info@techantum.com';
  const from =
    process.env.RESEND_FROM_EMAIL || 'TechAntum <onboarding@resend.dev>';

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `[TechAntum] New inquiry from ${data.name} — ${data.productCategory}`,
    html: buildContactEmailHtml(data),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export async function sendContactConfirmation(data: ContactEmailData): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    return { ok: false, error: 'RESEND_API_KEY is not configured' };
  }

  const from =
    process.env.RESEND_FROM_EMAIL || 'TechAntum <onboarding@resend.dev>';

  const { error } = await resend.emails.send({
    from,
    to: [data.email],
    subject: 'Thank you for contacting TechAntum',
    html: `<!DOCTYPE html>
<html><body style="font-family:Georgia,serif;color:#111827;line-height:1.6;padding:24px;">
  <p>Dear ${escapeHtml(data.name)},</p>
  <p>Thank you for reaching out to TechAntum. We have received your inquiry regarding <strong>${escapeHtml(data.productCategory)}</strong> and will respond within 24 hours.</p>
  <p>Best regards,<br><strong>TechAntum Team</strong><br>info@techantum.com</p>
</body></html>`,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
