# Security Documentation

This document outlines the security measures implemented in the Citibank Online Banking Platform.

## Security Measures Implemented

### 1. Authentication & Authorization

✅ **Password Security**
- Passwords hashed using bcrypt with 10 salt rounds
- Never stored in plaintext
- Minimum password requirements enforced:
  - At least 8 characters
  - Must contain uppercase letter
  - Must contain lowercase letter
  - Must contain number
  - Must contain special character

✅ **Session Management**
- JWT-based sessions with Auth.js (NextAuth v5)
- 7-day session expiry
- Secure session cookies with httpOnly flag
- Session validated on every protected route

✅ **Route Protection**
- Middleware enforces authentication on all `/dashboard/*` routes
- Unauthorized users redirected to login
- Logged-in users can't access auth pages (login/register)

### 2. Data Security

✅ **Decimal Precision for Money**
- All monetary values use `decimal(19,4)` type
- **Never** uses float/double (prevents rounding errors)
- Critical for financial accuracy

✅ **Database Transactions**
- Atomic operations for deposits
- Balance updates and transaction records created together
- Prevents race conditions and partial updates

✅ **Audit Trail**
- `balanceAfter` field provides complete transaction history
- Timestamps on all records
- Immutable transaction records (no updates after creation)

### 3. Input Validation

✅ **Client-Side Validation**
- Zod schemas validate all form inputs
- Real-time validation feedback
- Prevents malformed data submission

✅ **Server-Side Validation**
- All inputs re-validated on server
- Zod schemas enforce type safety
- Guards against bypassed client validation

✅ **Sanitization**
- Email format validation
- Amount range checks (positive, max limits)
- UUID validation for IDs

### 4. API Security

✅ **Authentication Checks**
- All API routes verify user session
- Return 401 Unauthorized if not authenticated

✅ **Authorization Checks**
- Users can only access their own data
- Account ownership verified before operations
- Foreign key constraints prevent unauthorized access

✅ **Error Handling**
- Generic error messages (don't leak sensitive info)
- Detailed errors only in server logs
- No stack traces exposed to clients

### 5. HTTP Security Headers

✅ **Security Headers** (configured in `next.config.js`)
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information

### 6. Code Security

✅ **Type Safety**
- Full TypeScript coverage
- Drizzle ORM prevents SQL injection
- Type-safe database queries

✅ **Dependency Security**
- Regular dependency updates
- No known critical vulnerabilities
- Minimal dependency footprint

## Security Limitations (MVP Scope)

⚠️ **Rate Limiting**: Not implemented
- Production should add rate limiting on auth endpoints
- Prevents brute force attacks

⚠️ **Email Verification**: Not implemented
- Users can register without verifying email
- Production should require email verification

⚠️ **Two-Factor Authentication**: Not implemented
- Production banking should have 2FA
- Adds extra layer of security

⚠️ **HTTPS**: Development uses HTTP
- Production MUST use HTTPS/TLS
- Required for secure data transmission

⚠️ **CSRF Protection**: Limited
- Auth.js provides basic CSRF protection
- Production should implement CSRF tokens for all forms

⚠️ **Session Revocation**: Not implemented
- No way to invalidate all user sessions
- Production should support session management

⚠️ **Account Lockout**: Not implemented
- No protection against repeated failed logins
- Production should lock accounts after N failed attempts

⚠️ **Withdrawal Limits**: Not enforced
- No daily/transaction limits
- Production should enforce regulatory limits

## Testing Security

### Manual Security Tests

**Authentication:**
- [ ] Passwords are hashed in database (check with `npm run db:studio`)
- [ ] Cannot access dashboard without login
- [ ] Invalid credentials show generic error (don't reveal if email exists)
- [ ] Session persists after page refresh
- [ ] Logout invalidates session

**Authorization:**
- [ ] Cannot access other users' accounts via API
- [ ] Cannot deposit to accounts you don't own
- [ ] API returns 401 for unauthenticated requests

**Input Validation:**
- [ ] Cannot deposit negative amounts
- [ ] Cannot deposit $0
- [ ] Cannot exceed max deposit ($1,000,000)
- [ ] SQL injection attempts are blocked (try `' OR 1=1--` in inputs)
- [ ] XSS attempts are escaped (try `<script>alert('xss')</script>`)

**Data Integrity:**
- [ ] Balance updates are atomic (no race conditions)
- [ ] Transaction history matches balance
- [ ] `balanceAfter` values are accurate

### Automated Testing (Recommended for Production)

```bash
# Install testing dependencies
npm install -D @playwright/test vitest

# Run unit tests
npm test

# Run E2E tests
npm run test:e2e
```

## Production Security Checklist

Before deploying to production, ensure:

### Infrastructure
- [ ] Use HTTPS/TLS certificates
- [ ] Enable database SSL connections
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Use environment variable secrets management (not hardcoded)

### Application
- [ ] Generate new `NEXTAUTH_SECRET` (never reuse dev secret)
- [ ] Set `NODE_ENV=production`
- [ ] Enable rate limiting on auth endpoints
- [ ] Implement email verification
- [ ] Add CSRF tokens
- [ ] Set up logging and monitoring
- [ ] Configure error reporting (e.g., Sentry)
- [ ] Add account lockout after failed logins

### Compliance
- [ ] Review data retention policies
- [ ] Implement GDPR/privacy compliance if applicable
- [ ] Add terms of service and privacy policy
- [ ] Implement audit logging for compliance
- [ ] Set up security incident response plan

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure security alerts
- [ ] Monitor failed login attempts
- [ ] Track unusual transaction patterns
- [ ] Log all financial operations

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security concerns privately
3. Provide detailed reproduction steps
4. Allow time for fix before disclosure

## Security Best Practices

### For Developers

1. **Never commit secrets**
   - Use `.env.local` (gitignored)
   - Never hardcode passwords/keys
   - Use environment variables

2. **Validate everything**
   - Client-side validation (UX)
   - Server-side validation (security)
   - Database constraints (last line of defense)

3. **Principle of least privilege**
   - Users only access their own data
   - Database users have minimal permissions
   - API keys have scoped permissions

4. **Keep dependencies updated**
   ```bash
   npm audit
   npm audit fix
   ```

5. **Review code for security**
   - Check for SQL injection risks
   - Verify authentication on endpoints
   - Test authorization logic

### For Users

1. **Strong passwords**
   - Use password manager
   - Unique password per site
   - Enable 2FA when available

2. **Secure connection**
   - Only use on trusted networks
   - Verify HTTPS in production
   - Don't share login credentials

3. **Monitor account activity**
   - Review transaction history regularly
   - Report suspicious activity
   - Keep email secure (for account recovery)

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Auth.js Security](https://authjs.dev/guides/basics/security)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Drizzle ORM Security](https://orm.drizzle.team/)

## Incident Response

In case of security incident:

1. **Immediate Actions**
   - Disable affected accounts
   - Revoke compromised sessions
   - Notify affected users

2. **Investigation**
   - Review server logs
   - Check database for unauthorized access
   - Identify attack vector

3. **Remediation**
   - Patch vulnerability
   - Update affected systems
   - Force password resets if needed

4. **Post-Mortem**
   - Document incident
   - Update security measures
   - Train team on lessons learned

---

**Note**: This is an MVP/prototype platform. Production banking applications require significantly more security measures, regular security audits, and compliance with financial regulations (PCI DSS, SOC 2, etc.).
