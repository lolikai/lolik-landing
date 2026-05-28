# Deploy — lolik-landing → Cloudflare Pages

This is a standalone Next.js landing site.
It only contains: `/`, `/privacy`, `/terms`, and `POST /api/waitlist`.
No dashboard, no auth, no AI routes, no OpenAI, no app access.

---

## What gets deployed

| Route         | Type              | Notes                          |
|---------------|-------------------|--------------------------------|
| `/`           | Static (HTML)     | Landing page + waitlist form   |
| `/privacy`    | Static (HTML)     | Privacy policy                 |
| `/terms`      | Static (HTML)     | Terms of service               |
| `/api/waitlist` | Edge Function   | Writes email to Supabase waitlist table |

Everything else → 404. No app routes exposed.

---

## Environment variables

Set these in **Cloudflare Pages → Settings → Environment Variables** (Production + Preview).

| Variable | Value | Where used |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | client + server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_xxx` | metadata only (fallback) |
| `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_xxx` | waitlist API route (server-only) |
| `NEXT_PUBLIC_SITE_URL` | `https://lolikai.com` | OG metadata canonical URL |

> `SUPABASE_SERVICE_ROLE_KEY` is never exposed to the browser — it's only read
> inside the Edge Function at `/api/waitlist`. The `NEXT_PUBLIC_` keys are safe
> to expose publicly; they only allow reading public data.

---

## Option A — Cloudflare Pages dashboard (recommended for first deploy)

1. Push this folder to a **new GitHub repo** (e.g. `lolik-landing`)

2. In Cloudflare dashboard → **Pages → Create a project → Connect to Git**

3. Select the repo, then set:
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Node.js version**: `20`

4. Add the four environment variables above.

5. Deploy. After the first build, every `git push` to `main` auto-deploys.

---

## Option B — Wrangler CLI deploy

```bash
# 1. Build
npm run pages:build

# 2. Login to Cloudflare (first time only)
npx wrangler login

# 3. Deploy
npm run pages:deploy
# equivalent: wrangler pages deploy .vercel/output/static --project-name=lolik-landing
```

---

## Local preview (Cloudflare Workers runtime)

```bash
npm run pages:build
npm run pages:dev
# opens on http://localhost:8788
```

---

## Local dev (standard Next.js)

```bash
cp .env.example .env.local
# fill in the real values
npm run dev
# opens on http://localhost:3000
```

---

## Supabase: verify the waitlist table exists

The waitlist API writes to a table called `waitlist` with columns:
- `email` TEXT PRIMARY KEY
- `joined_at` TIMESTAMPTZ

If it doesn't exist yet, run this in Supabase SQL editor:

```sql
create table if not exists waitlist (
  email text primary key,
  joined_at timestamptz not null default now()
);

-- RLS: allow anonymous INSERT only, no SELECT (protects PII)
alter table waitlist enable row level security;

create policy "anon_insert_only"
  on waitlist
  for insert
  to anon
  with check (true);
```

> The API route uses the service role key which bypasses RLS,
> so the policy above is for direct anon/client calls.
> The current route only runs server-side, so the table is safe.

---

## Blocked routes

All app routes (`/dashboard`, `/login`, `/signup`, `/admin`, `/breakdown`,
`/channels`, `/feed`, `/alerts`, `/reports`, `/saved`, `/search`, `/trends`,
`/api/news`, `/api/breakdown`, `/api/trends/**`) are simply absent from this
project. They return 404 — nothing to block or redirect.
