# Email.js Setup Guide for LMS Platform

This guide will help you configure Email.js to send automated emails for:
- **Welcome emails** when users sign up
- **Registration confirmation emails** when users register for courses

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

## Step 3: Create Email Templates

You need to create templates for different email types. You can use the same template for both or create separate templates.

### Option A: Single Template (Recommended for Simplicity)

1. Click on **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Use the following universal template structure:

```
Subject: {{subject}}

Hello {{to_name}},

{{message}}

Course Details:
- Course: {{course}}
- Designation: {{designation}}
- Location: {{location}}

Thank you for choosing LMS Platform!

Best regards,
{{from_name}}
```

4. **Copy the Template ID** (you'll need this later)
5. Save the template

### Option B: Separate Templates

#### Template 1: Welcome Email (for Sign Up)

```
Subject: Welcome to LMS Platform

Hello {{to_name}},

{{message}}

Thank you for joining our Learning Management System. You can now access all our courses and resources.

Best regards,
{{from_name}}
```

#### Template 2: Registration Confirmation (for Course Registration)

```
Subject: Course Registration Confirmation

Hello {{user_name}},

{{message}}

Registration Details:
━━━━━━━━━━━━━━━━━━━━
📚 Course: {{course}}
💼 Designation: {{designation}}
📍 Location: {{location}}

We're excited to have you in our {{course}} program! Our team will reach out to you shortly with next steps and course materials.

If you have any questions, feel free to contact us.

Best regards,
LMS Platform Team
```

**Note**: If using separate templates, copy both Template IDs. You'll configure the registration template ID in the email service.

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

### Test 1: Sign Up Email

1. Run your Angular application:
   ```bash
   ng serve
   ```

2. Navigate to the Sign Up page: `http://localhost:4200/user-management/signup`

3. Fill in the form with a valid email address (use your own email for testing)

4. Click **Sign Up**

5. Check your email inbox for the welcome message

### Test 2: Registration Confirmation Email

1. Navigate to the Registration page: `http://localhost:4200/registration`

2. Fill in all required fields:
   - Name
   - Designation
   - Course
   - Location

3. Click **Submit**

4. Check your email inbox for the registration confirmation

**Note**: Registration emails currently use a fallback admin email. To send to the actual registrant, you'll need to add an email field to the registration form.

## Email Template Variables

### Welcome Email Variables (Sign Up)

The following variables are sent from the signup component:

- `{{to_name}}` - User's name from signup form
- `{{to_email}}` - User's email address
- `{{from_name}}` - 'LMS Platform' (hardcoded)
- `{{message}}` - Welcome message text
- `{{subject}}` - 'Welcome to LMS Platform'

### Registration Confirmation Variables (Course Registration)

The following variables are sent from the registration component:

- `{{to_name}}` or `{{user_name}}` - Registrant's name
- `{{to_email}}` - Email address (currently defaults to admin email)
- `{{from_name}}` - 'LMS Platform'
- `{{course}}` - Selected course (e.g., 'Angular', 'Python Basics')
- `{{designation}}` - User's designation (e.g., 'Student', 'Professional')
- `{{location}}` - User's location (e.g., 'New York', 'Mumbai')
- `{{message}}` - Confirmation message with course details
- `{{subject}}` - 'Course Registration Confirmation'

## Customizing Email Content

### Customize Welcome Email

To customize the welcome email content, edit the `sendWelcomeEmail` method in `src/app/services/email.service.ts`:

```typescript
const templateParams = {
  to_name: userName,
  to_email: userEmail,
  from_name: 'LMS Platform',
  message: `Your custom welcome message here`,
  subject: 'Welcome to LMS Platform'
};
```

### Customize Registration Confirmation Email

To customize the registration confirmation email, edit the `sendRegistrationEmail` method in `src/app/services/email.service.ts`:

```typescript
const templateParams = {
  to_name: registration.name,
  to_email: userEmail || 'admin@lms-platform.com',
  from_name: 'LMS Platform',
  user_name: registration.name,
  course: registration.course,
  designation: registration.designation,
  location: registration.location,
  message: `Your custom registration message here`,
  subject: 'Course Registration Confirmation'
};
```

### Add Email Field to Registration Form (Optional)

To send registration emails to the actual registrant instead of admin:

1. Add email field to the registration form in `registration.component.ts`:
   ```typescript
   email: ['', [Validators.required, Validators.email]]
   ```

2. Update the registration model in `registration.model.ts` to include email

3. Pass the email when calling `sendRegistrationEmail`:
   ```typescript
   await this.emailService.sendRegistrationEmail(registration, registration.email);
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

## Current Email Flow in LMS Platform

### 1. User Sign Up Flow
- User fills signup form at `/user-management/signup`
- User data saved to localStorage
- Welcome email sent via `sendWelcomeEmail()`
- User redirected to dashboard

### 2. Course Registration Flow
- User fills registration form at `/registration`
- Registration data sent to backend (MySQL database)
- Registration confirmation email sent via `sendRegistrationEmail()`
- Success message displayed
- Form resets

### Email Error Handling
- Email sending is non-blocking (doesn't prevent registration)
- Errors are logged to console
- Registration/signup succeeds even if email fails
- User sees success message regardless of email status

## Future Enhancements

Consider implementing:
1. **Email Field in Registration**: Add email field to collect registrant's email
2. **Email Verification**: Send verification links before activating accounts
3. **Multiple Templates**: Different templates for different courses
4. **Email Queue**: Queue emails for retry if they fail
5. **Admin Notifications**: Send copy of registrations to admin
6. **Email Analytics**: Track open rates and click-through rates

## Support

If you encounter issues:
1. Check the Email.js documentation
2. Review browser console for error messages
3. Check Email.js dashboard for delivery status
4. Contact Email.js support: support@emailjs.com
