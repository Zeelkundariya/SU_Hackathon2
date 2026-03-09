const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Initialize Twilio client (requires credentials from .env)
// For Hackathon demo, we check if credentials exist, otherwise log to console
let client = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
        client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        console.log('[Twilio API] Success: Credentials loaded and client initialized.');
    } catch (err) {
        console.error('[Twilio API] Error: Failed to initialize client.', err.message);
    }
} else {
    console.warn('[Twilio API] Warning: Missing Twilio credentials. Messages will be simulated in the console.');
}

// @route   POST /api/whatsapp/send
// @desc    Send a WhatsApp message via Twilio Sandbox
// @access  Public
router.post('/send', async (req, res) => {
    try {
        const { to, message } = req.body;

        if (!to || !message) {
            return res.status(400).json({ error: 'Please provide both "to" (phone number) and "message" body.' });
        }

        // Always log the intent for debugging
        console.log(`[Twilio API] Intending to send WhatsApp message to ${to}: "${message}"`);

        // Actual Twilio Send
        if (client && process.env.TWILIO_PHONE_NUMBER) {
            const msg = await client.messages.create({
                body: message,
                from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`, // The approved Twilio sandbox number
                to: `whatsapp:${to}`
            });
            console.log(`[Twilio API] Message physically sent! SID: ${msg.sid}`);
            return res.status(200).json({ success: true, sid: msg.sid, status: 'sent', message: 'WhatsApp message physically sent via Twilio.' });
        } else {
            // Simulation mode if credentials are forgotten/missing
            console.log(`[Twilio API] (Simulation) Message would have been sent via WhatsApp to ${to}. Add .env credentials to activate real send.`);
            // Add a tiny delay to simulate network request
            await new Promise(resolve => setTimeout(resolve, 800));
            return res.status(200).json({ success: true, status: 'simulated', message: 'WhatsApp message simulated (missing Twilio credentials).' });
        }

    } catch (error) {
        console.error(`[Twilio API] Critical send error: ${error.message}`);
        return res.status(500).json({ error: 'Failed to send WhatsApp message. Ensure the target number has opted into the Twilio Sandbox.' });
    }
});

module.exports = router;
