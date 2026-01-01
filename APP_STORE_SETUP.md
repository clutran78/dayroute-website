# App Store Connect Setup Guide

This document explains how to connect the DayRoute website to App Store Connect once your app is approved and live.

## Quick Setup (5 minutes)

When your app is approved on the App Store, update **one file** to make all links go live:

### 1. Edit `src/lib/app-store-config.ts`

```typescript
// Change these values:

export const APPLE_APP_ID = "XXXXXXXXXX";     // Your App ID from App Store Connect
export const APPLE_TEAM_ID = "XXXXXXXXXX";    // Your Team ID from developer.apple.com
export const APP_BUNDLE_ID = "com.dayroute.app";  // Verify this matches Xcode
export const IS_APP_LIVE = true;              // <- Change to true when app is live!
```

### 2. Update Universal Links (apple-app-site-association)

Edit `public/.well-known/apple-app-site-association`:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.dayroute.app",  // Replace TEAMID with your actual Team ID
        "paths": [
          "/download",
          "/app",
          "/subscribe",
          "/subscribe/*"
        ]
      }
    ]
  },
  ...
}
```

### 3. Deploy to Production

Push changes to GitHub and deploy to your hosting provider (Vercel, etc.).

---

## Finding Your App Store Values

### Apple App ID

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click on your app (DayRoute)
3. Go to "App Information" in the left sidebar
4. Find "Apple ID" - it's a numeric string like `1234567890`

### Team ID

1. Go to [developer.apple.com](https://developer.apple.com)
2. Click "Account" → "Membership"
3. Your Team ID is displayed on this page

### Bundle ID

- This should match your Xcode project: `com.dayroute.app`
- Verify in Xcode: Target → General → Bundle Identifier

---

## What Changes When `IS_APP_LIVE = true`

| Component | Before (Coming Soon) | After (Live) |
|-----------|---------------------|--------------|
| Download buttons | Link to `/#waitlist` | Link to App Store |
| Header CTA | Shows "Join Waitlist" | Shows "Download" only |
| Smart App Banner | Placeholder | Shows real app banner in Safari |
| All CTAs | Internal links | External App Store links |

---

## Files Configured for App Store Connect

| File | Purpose |
|------|---------|
| `src/lib/app-store-config.ts` | Central config for all App Store URLs |
| `src/components/app-store-button.tsx` | Reusable download button component |
| `public/.well-known/apple-app-site-association` | Universal Links config |
| `src/app/layout.tsx` | Smart App Banner meta tag |

---

## RevenueCat Product IDs

The pricing page references these product IDs. Make sure they match App Store Connect:

| Product | RevenueCat ID | App Store Product ID |
|---------|---------------|---------------------|
| Pro Monthly | `dayroute_pro_monthly` | Should match |
| Pro Yearly | `dayroute_pro_yearly` | Should match |
| Team 3 Monthly | `dayroute_team_3_monthly` | Should match |
| Team 3 Yearly | `dayroute_team_3_yearly` | Should match |
| Team 10 Monthly | `dayroute_team_10_monthly` | Should match |
| Team 10 Yearly | `dayroute_team_10_yearly` | Should match |

---

## Testing Universal Links

After deploying with your real Team ID:

1. **Verify the file is accessible:**
   ```
   curl https://dayroute.com.au/.well-known/apple-app-site-association
   ```

2. **Use Apple's validator:**
   - Go to: https://search.developer.apple.com/appsearch-validation-tool/
   - Enter: `https://dayroute.com.au`

3. **Test on device:**
   - Open Safari on iPhone
   - Go to `https://dayroute.com.au/download`
   - Should prompt to open in app if installed

---

## Checklist

- [ ] App approved on App Store
- [ ] Get Apple App ID from App Store Connect
- [ ] Get Team ID from developer.apple.com
- [ ] Update `app-store-config.ts` with real values
- [ ] Set `IS_APP_LIVE = true`
- [ ] Update `apple-app-site-association` with real Team ID
- [ ] Deploy to production
- [ ] Test Smart App Banner in Safari (iOS)
- [ ] Test Universal Links
- [ ] Verify download buttons link to App Store

