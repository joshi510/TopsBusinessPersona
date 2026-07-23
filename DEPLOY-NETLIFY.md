# Netlify — Business AI Persona

## 1. Push code to GitHub / GitLab / Bitbucket

Netlify deploys from a Git repo. If the project is not on GitHub yet:

1. Create a new empty repo on GitHub
2. From this project folder:

```bash
git init
git add .
git commit -m "Prepare Netlify deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 2. Create site on Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import an existing project**
3. Connect your Git provider and select this repo
4. Build settings (should auto-detect Next.js):

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `20` |

`netlify.toml` in the repo already sets these.

## 3. Environment variables (Site settings → Environment variables)

Add:

| Key | Example | Required |
|-----|---------|----------|
| `DATABASE_URL` | `file:./dev.db` | Yes (build / Prisma) |
| `NEXT_PUBLIC_APP_URL` | `https://your-site.netlify.app` | Recommended (SEO / sitemap) |

After the first deploy, set `NEXT_PUBLIC_APP_URL` to your real Netlify URL (or custom domain) and redeploy.

### Important: SQLite on Netlify

This project uses **Prisma + SQLite**. On Netlify, serverless functions **cannot reliably keep** a local SQLite file.

The intake API already **skips DB errors** and continues, so the site UI will still work for demos (assessment matching is mostly client-side).

For real lead storage in production, switch Prisma to **PostgreSQL** (Neon, Supabase, or Netlify DB) and update:

- `prisma/schema.prisma` → `provider = "postgresql"`
- `DATABASE_URL` → your Postgres connection string

## 4. Deploy

Click **Deploy site**. First build runs `prisma generate && next build`.

## 5. Optional: Netlify CLI (local)

```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --build --prod
```

## 6. Custom domain (optional)

Netlify → Domain management → Add custom domain → follow DNS steps.
