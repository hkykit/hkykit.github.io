# Cross-device sync (Supabase)

`trainer.html` syncs its data (goals, measurements, food log, workouts, etc.)
across devices using Supabase Auth + a single `trainer_data` table.

## One-time setup

1. Open your Supabase project's SQL Editor and run `schema.sql` from this
   folder. It creates the `trainer_data` table with Row Level Security so
   each signed-in user can only ever read/write their own row.
2. In **Authentication > URL Configuration**, add
   `https://hkykit.github.io/trainer.html` to the Redirect URLs allow-list
   (needed for the magic-link email sign-in to work).
3. That's it — no further config needed in the app itself.

## How it works

- Sign-in is passwordless: enter your email in the "☁️ 跨裝置同步" card, get
  a magic link, click it, you're in.
- The anon/publishable key embedded in `trainer.html` is **meant to be
  public** — it does not grant any access on its own. Row Level Security
  policies (created by `schema.sql`) are what actually restrict each user to
  their own data. Never put the Supabase `service_role` key in this repo or
  any client-side code — that one is a real secret.
- While signed in, every `saveData()` call also pushes the local data to
  Supabase (debounced ~800ms). On sign-in, the latest copy is pulled down
  and replaces local data so all devices stay in sync.
- Signed out, the app works exactly as before, using only localStorage.
