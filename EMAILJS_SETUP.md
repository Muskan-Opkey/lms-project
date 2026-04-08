# Email.js Setup Guide for LMS Platform

This guide will help you configure Email.js to send welcome emails when users sign up.

## Prerequisites

- An Email.js account (free tier available)
- Access to the email account you want to send emails from

## Step 1: Create an Email.js Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Log in to your Email.js dashboard
2. Click on **Email Services** in the left sidebar
3. Click **Add New Service**
4. Choose your email provider (Gmail, Outlook, etc.)
5. Follow the setup instructions for your provider
6. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Click on **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Use the following template structure:

```
Subject: Welcome to LMS Platform

Hello {{to_name}},

{{message}}

Thank you for joining our Learning Management System. You can now access all our courses and resources.

Best regards,
{{from_name}}
```

4. **Copy the Template ID** (you'll need this later)
5. Save the template

## Step 4: Get Your Public Key

1. Click on **Account** in the left sidebar
2. Go to **API Keys** section
3. **Copy your Public Key**

## Step 5: Configure Your Angular App

Open the file: `src/app/services/email.service.ts`

Replace the placeholder values with your actual credentials:

```typescript
private serviceId = 'YOUR_SERVICE_ID';      // Replace with your Service ID
private templateId = 'YOUR_TEMPLATE_ID';    // Replace with your Template ID
private publicKey = 'YOUR_PUBLIC_KEY';      // Replace with your Public Key
```

### Example:

```typescript
private serviceId = 'service_abc123xyz';
private templateId = 'template_xyz789abc';
private publicKey = 'xK9vL2mN8pQ5rS7t';
```

## Step 6: Test the Integration

1. Run your Angular application:
   ```bash
   ng serve
   ```

2. Navigate to the Sign Up page: `http://localhost:4200/user-management/signup`

3. Fill in the form with a valid email address (use your own email for testing)

4. Click **Sign Up**

5. Check your email inbox for the welcome message

## Email Template Variables

The following variables are sent to Email.js from the signup component:

- `{{to_name}}` - User's name from signup form
- `{{to_email}}` - User's email address
- `{{from_name}}` - 'LMS Platform' (hardcoded)
- `{{message}}` - Welcome message text
- `{{subject}}` - Email subject line

## Customizing Email Content

To customize the welcome email content, edit the `sendWelcomeEmail` method in `src/app/services/email.service.ts`:

```typescript
const templateParams = {
  to_name: userName,
  to_email: userEmail,
  from_name: 'LMS Platform',
  message: `Your custom message here`,
  subject: 'Your custom subject'
};
```

## Troubleshooting

### Emails Not Sending

1. **Check console for errors** - Open browser DevTools and check the console
2. **Verify credentials** - Make sure Service ID, Template ID, and Public Key are correct
3. **Check Email.js dashboard** - Look at the usage statistics to see if requests are being received
4. **Email provider limits** - Free tier has monthly email limits (200 emails/month)

### Email Going to Spam

1. Use a verified email address in Email.js
2. Keep email content professional
3. Ask users to add your email to their contacts

### Template Not Found Error

- Ensure the Template ID exactly matches the one in your Email.js dashboard
- Template IDs are case-sensitive

## Email.js Free Tier Limits

- 200 emails per month
- 2 email services
- 3 email templates
- Limited support

For production use with higher volume, consider upgrading to a paid plan.

## Security Best Practices

⚠️ **Important**: 
- Never commit your Email.js credentials to version control
- Consider using environment variables for production
- The Public Key is safe to expose in client-side code (it's designed for this)
- However, Service ID and Template ID should ideally be kept private in production

## Production Recommendations

For production deployment, consider:

1. **Environment Variables**: Store credentials in environment files
2. **Backend API**: Move email sending to a backend service for better security
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Email Verification**: Add email verification before activating accounts
5. **Better Email Provider**: Use services like SendGrid, AWS SES, or Mailgun for production

## Additional Resources

- [Email.js Documentation](https://www.emailjs.com/docs/)
- [Email.js Dashboard](https://dashboard.emailjs.com/)
- [Email.js Pricing](https://www.emailjs.com/pricing/)

## Support

If you encounter issues:
1. Check the Email.js documentation
2. Review browser console for error messages
3. Check Email.js dashboard for delivery status
4. Contact Email.js support: support@emailjs.com
