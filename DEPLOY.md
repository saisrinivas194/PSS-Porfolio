# Deploy this portfolio

## 1. Push to GitHub

Create a new repository on [GitHub](https://github.com/new) (e.g. `portfolio` or `sai-portfolio`). Then run:

```bash
cd /Users/saisrinivaspedhapolla/Downloads/portfolio
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

(Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.)

## 2. Host on Vercel (recommended for Next.js)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New** → **Project** and import your GitHub repo.
3. Leave **Framework Preset** as Next.js and click **Deploy**.
4. After the first deploy, add environment variables:
   - **Settings** → **Environment Variables**
   - Add:
     - `GEMINI_API_KEY` = your Gemini key (for AI assistant)
     - `RESEND_API_KEY` = your Resend key (for contact form email)
   - (Optional) `RESEND_FROM_EMAIL` if you use a custom “from” address.
5. **Redeploy** (Deployments → ⋮ on latest → Redeploy) so the new env vars are used.

Your site will be at `https://your-project.vercel.app`. You can add a custom domain in Vercel **Settings** → **Domains**.

## Notes

- `.env.local` is **not** pushed to Git (secrets stay local). You must set the same variables in Vercel.
- For contact form email to work in production, use a verified domain in Resend or keep the default “onboarding@resend.dev” (sends only to your email until domain is verified).
