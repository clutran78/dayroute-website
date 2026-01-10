# DayRoute Website Milestones

## Milestone 1: Waitlist Backend Fixed ✅
**Date:** January 10, 2026  
**Status:** Complete

### Summary
Successfully configured Supabase backend for the DayRoute website waitlist functionality.

### What Was Fixed
1. **Vercel Environment Variables** - Updated to point to correct DayRoute Supabase project
   - `NEXT_PUBLIC_SUPABASE_URL`: https://nqefsrzzcbamszmnzlsr.supabase.co
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Configured correctly

2. **Supabase Database Permissions** - Granted table-level permissions to `anon` role
   ```sql
   GRANT INSERT ON public.waitlist_subscribers TO anon;
   GRANT SELECT ON public.waitlist_subscribers TO anon;
   ```

3. **Row Level Security (RLS)** - Disabled on `waitlist_subscribers` table for public signups

### Database Schema
Table: `public.waitlist_subscribers`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| email | text | Subscriber email (unique) |
| source | text | Signup source (e.g., "website") |
| ip_address | text | User's IP address |
| user_agent | text | Browser user agent |
| subscribed_at | timestamptz | Signup timestamp |
| confirmed | boolean | Email confirmed status |
| unsubscribed | boolean | Unsubscribe status |

### Testing
- ✅ curl POST to `/api/waitlist` returns success
- ✅ Data correctly saved to Supabase database
- ✅ Website form shows "You're on the list!" confirmation

### Live URL
- Website: https://dayroute.com.au
- Waitlist: https://dayroute.com.au/#waitlist

---

## Future Milestones

### Milestone 2: iOS App Backend (Pending)
- User authentication with Supabase Auth
- RLS policies for user data tables
- Profiles, jobs, clients, invoices tables configured

### Milestone 3: App Store Launch (Pending)
- TestFlight beta testing
- App Store submission
- Marketing website updates
