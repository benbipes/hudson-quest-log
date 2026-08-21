// SMS Dispatch Utility for Hudson's Quest Tracker
// Phone number: 919-961-8875

export const DAD_PHONE_NUMBER = '919-961-8875';

/**
 * Generate native sms: URI for pre-filling SMS app on Mobile / Mac iMessage
 */
export function generateSmsUrl(phoneNumber = DAD_PHONE_NUMBER, message = '') {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  // Support both iOS/macOS (&body=) and general standards (?body=)
  const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
  const delimiter = isApple ? '&' : '?';
  return `sms:${cleanNumber}${delimiter}body=${encodedMsg}`;
}

/**
 * Format progress update message for Dad
 */
export function createProgressSmsMessage(dateStr, completedCount, totalCount, completedTitles, streakCount) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  if (percent === 100) {
    return `🎉 HUDSON QUEST COMPLETE! (${dateStr})
Dad! I checked off ALL ${totalCount}/${totalCount} chores today! 🏆
Streak: ${streakCount} Day(s) 🔥
Quests Completed:
${completedTitles.map(t => '✅ ' + t).join('\n')}`;
  }

  return `⚡ Hudson's Quest Progress (${dateStr}):
Completed: ${completedCount}/${totalCount} (${percent}%)
Current Streak: ${streakCount} Day(s)
Done:
${completedTitles.map(t => '✅ ' + t).join('\n')}`;
}

/**
 * Twilio REST API integration (Optional Serverless or Direct Dispatch)
 */
export async function sendTwilioSms({ accountSid, authToken, fromNumber, toNumber = DAD_PHONE_NUMBER, body }) {
  if (!accountSid || !authToken || !fromNumber) {
    throw new Error('Twilio credentials missing. Please set Account SID, Auth Token, and From Number.');
  }

  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const credentials = btoa(`${accountSid}:${authToken}`);

  const formData = new URLSearchParams();
  formData.append('To', toNumber.startsWith('+') ? toNumber : `+1${toNumber.replace(/[^0-9]/g, '')}`);
  formData.append('From', fromNumber);
  formData.append('Body', body);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to send SMS via Twilio');
  }

  return await response.json();
}
