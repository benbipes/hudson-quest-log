// Node script to test or trigger SMS alert to Dad at 919-961-8875

const DAD_PHONE = '919-961-8875';

const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

if (!sid || !token || !fromNumber) {
  console.log(`[SMS Alert Setup]
Target Phone: ${DAD_PHONE}
Status: Ready for Twilio API credentials or 1-click native SMS URI.
To run automated SMS via Twilio, export TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER in your environment.`);
  process.exit(0);
}

async function sendAlert() {
  const message = `⚡ Hudson Quest Log Update: Hudson checked off today's chores! Target phone: ${DAD_PHONE}`;
  
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const credentials = Buffer.from(`${sid}:${token}`).toString('base64');

  const params = new URLSearchParams();
  params.append('To', '+19199618875');
  params.append('From', fromNumber);
  params.append('Body', message);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    const data = await res.json();
    if (res.ok) {
      console.log('✅ SMS successfully sent to ' + DAD_PHONE, data.sid);
    } else {
      console.error('❌ Failed to send SMS:', data.message);
    }
  } catch (err) {
    console.error('❌ Error sending SMS:', err);
  }
}

sendAlert();
