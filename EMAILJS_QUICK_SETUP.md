# 📧 EmailJS Quick Setup Guide - 5 Minutes

## ⚠️ IMPORTANT: Where Do Emails Go?

**Emails DO NOT go to EmailJS dashboard!**

Emails are sent to:
- ✅ **The user's email** (the email they enter in the registration form)
- ✅ **Your admin email** (configured in email.service.ts)

The EmailJS dashboard only shows **statistics** (how many emails were sent), not the actual emails.

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Create EmailJS Account
1. Go to: https://www.emailjs.com/
2. Click **Sign Up** (free account)
3. Verify your email

### Step 2: Connect Your Email
1. Dashboard → **Email Services** → **Add New Service**
2. Choose your email provider:
   - **Gmail** (recommended for testing)
   - Outlook
   - Yahoo
   - Others
3. Follow the connection steps
4. **COPY the Service ID** → Example: `service_abc123`

### Step 3: Create Email Template
1. Dashboard → **Email Templates** → **Create New Template**
2. Template Name: `Registration Confirmation`
3. Use this template:

```
Subject: {{subject}}

Hello {{user_name}},

{{message}}

Registration Details:
━━━━━━━━━━━━━━━━━━
Name: {{user_name}}
Email: {{user_email}}
Course: {{course}}
Designation: {{designation}}
Location: {{location}}

Thank you for registering with LMS Platform!

Best regards,
LMS Platform Team
```

4. **COPY the Template ID** → Example: `template_xyz789`

### Step 4: Get Public Key
1. Dashboard → **Account** → **API Keys**
2. **COPY your Public Key** → Example: `xK9vL2mN8pQ5rS7t`

### Step 5: Update Your Code

Open: `src/app/services/email.service.ts`

Find lines 11-17 and replace with your actual values:

```typescript
// Replace these 4 values:
private serviceId = 'service_abc123';           // Your Service ID
private templateId = 'template_xyz789';         // Your Template ID
private publicKey = 'xK9vL2mN8pQ5rS7t';        // Your Public Key
private adminEmail = 'your-email@gmail.com';    // Your email to receive copies
```

**Example with real values:**
```typescript
private serviceId = 'service_kp7md2q';
private templateId = 'template_kx4n8p2';
private publicKey = 'Bv3jT8xL2mN5pQ9r';
private adminEmail = 'admin@mycompany.com';
```

---

## ✅ Testing

1. **Save** the email.service.ts file
2. **Restart** the Angular application (if needed)
3. Go to: http://localhost:4136/registration
4. Fill the form with:
   - Name: Test User
   - **Email: YOUR ACTUAL EMAIL** ← Use your real email!
   - Designation: Student
   - Course: Any course
   - Location: Any location
5. Click **Submit Registration**

### What Should Happen:

✅ Alert shows: "Confirmation email sent to: your-email@example.com"
✅ Check **your email inbox** (the one you entered in the form)
✅ Email subject: "Course Registration Confirmation - [Course Name]"
✅ **Also check your SPAM/JUNK folder!**

### If Email Doesn't Arrive:

1. **Check browser console** for errors (F12 → Console)
2. **Check EmailJS dashboard** → Statistics → See if request was sent
3. **Check spam folder** in your email
4. **Verify credentials** in email.service.ts are correct
5. **Wait 1-2 minutes** (sometimes delayed)

---

## 🔍 Common Issues

### ❌ "Public Key is invalid"
- You used placeholder values
- Solution: Replace `YOUR_PUBLIC_KEY` with actual key from EmailJS

### ❌ "Service ID not found"
- Wrong Service ID
- Solution: Copy Service ID from EmailJS dashboard again

### ❌ "Template not found"
- Wrong Template ID
- Solution: Copy Template ID from EmailJS dashboard again

### ❌ Emails go to spam
- Normal for new EmailJS accounts
- Check spam folder
- Mark as "Not Spam" to train your email provider

### ❌ No email received at all
- Check if EmailJS free tier limit reached (200 emails/month)
- Verify email address entered in form is correct
- Check EmailJS dashboard → Email Services → Connection status

---

## 📊 How to Check if Email Was Sent

### In Browser Console (F12):
```
✅ SUCCESS! Confirmation email sent to: user@example.com
📬 Check your inbox at: user@example.com
```

### In EmailJS Dashboard:
1. Go to: https://dashboard.emailjs.com/admin
2. Click your email service
3. Check **Statistics** or **History**
4. You'll see the email request (but NOT the actual email content)

---

## 🎯 What Happens When User Submits:

1. ✅ User fills form with their email: `john@example.com`
2. ✅ Form submits to database
3. ✅ Email is sent to: `john@example.com` (user's email)
4. ✅ Email is ALSO sent to: Your admin email
5. ✅ User receives confirmation in their inbox
6. ✅ You (admin) receive notification in your inbox

---

## 📝 Email Template Variables Reference

Make sure your EmailJS template includes these:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{to_name}}` | Recipient name | John Doe |
| `{{to_email}}` | Recipient email | john@example.com |
| `{{user_name}}` | Registrant name | John Doe |
| `{{user_email}}` | Registrant email | john@example.com |
| `{{course}}` | Selected course | Angular |
| `{{designation}}` | User role | Student |
| `{{location}}` | User location | New York |
| `{{message}}` | Custom message | Thank you for registering... |
| `{{subject}}` | Email subject | Course Registration Confirmation |

---

## 💡 Pro Tips

1. **Use your real email** when testing (not fake emails)
2. **Check spam folder** first time
3. **EmailJS dashboard** shows stats, not actual emails
4. **Free tier**: 200 emails/month
5. **Emails are instant** (usually under 10 seconds)
6. **Both user AND admin** receive emails

---

## 🆘 Still Not Working?

1. Open browser console (F12)
2. Submit registration
3. Copy any error messages
4. Check EmailJS dashboard for error details
5. Verify all 3 credentials are correct

---

## ✅ Success Checklist

Before submitting registration:

- [ ] EmailJS account created and verified
- [ ] Email service connected (Gmail/Outlook/etc)
- [ ] Email template created with all variables
- [ ] Service ID copied to email.service.ts
- [ ] Template ID copied to email.service.ts
- [ ] Public Key copied to email.service.ts
- [ ] Admin email set to your real email
- [ ] Angular app restarted
- [ ] Used REAL email in test form
- [ ] Checked spam folder

---

**🎉 Once configured, emails will be sent automatically to the user's email address (the one they enter in the form)!**
