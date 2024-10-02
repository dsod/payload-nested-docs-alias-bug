# Bug reproduction steps
1. Run a postgres instance and optionally update the .env > DATABASE_URI variable accordingly
2. `pnpm install && pnpm run dev`
3. Open `/admin` and log in with `test1@example.com` and `test1`
4. Navigate to a user detail view
5. Click on the `Parent` dropdown field

This will produce a `Error: Alias "users_breadcrumbs" is already used in this query` error