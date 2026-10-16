**Lab 4 & 5: Next.js Rendering, API Routes & Supabase Favorites**

Class SE20B.NJS | Practical exam | 10 points | Deadline: \_**\_**\_**\_**\__

# **1\. Objectives**

- Extend your **Lab 3** project (same GitHub repository, same Vercel project, same Supabase project). Everything from Lab 3 — Supabase login, AuthContext, the auth-aware header and /account — must keep working.
- Use the parts of Next.js that go beyond plain React: **server-rendered pages**, **dynamic routes**, **per-page metadata**, **Route Handlers (API routes)**, and loading / error / not-found handling.
- Store each user's **favorite products** in a Supabase database table protected by **Row Level Security (RLS)**, and manage them in a second Context built with useReducer.

# **2\. Requirements**

**2.0 Product data**

- Keep one shared product list (e.g. data/products.ts) used by the pages **and** the API. It must contain **at least 6 products**, each with: numeric unique id (1, 2, 3 …), name, price (number), description, category (string, at least **2 different categories**) and image.

**2.1 Product detail page — /products/\[id\] (server-rendered)**

- Create app/products/\[id\]/page.tsx as a **Server Component** (no "use client" at the top). Read the id from params (in Next.js 15+, params is a Promise — await it).
- The product name, price, description and category must be in the **HTML sent by the server** (not loaded later in the browser) inside data-testid="product-detail", with the testids listed in section 3.
- Export generateMetadata so the page &lt;title&gt; is &lt;product name&gt; | &lt;your store name&gt; for each product.
- Export generateStaticParams returning every product id, so the pages are pre-rendered at build time.
- If the id does not exist (e.g. /products/9999 or /products/abc) call notFound(). Create app/not-found.tsx showing data-testid="not-found". The response status must be **404**.
- On the Home page each product card links to its detail page (data-testid="link-detail").

**2.2 API routes (Route Handlers)**

- GET /api/products → status 200, JSON **array** of all products (use NextResponse.json).
- GET /api/products?q=&lt;text&gt; → only products whose name or description contains the text, **case-insensitive**.
- GET /api/products?category=&lt;name&gt; → only products of that category (case-insensitive exact match). q and category can be combined.
- GET /api/products/\[id\] → status 200 and a single JSON object; for an unknown id → status **404** and JSON { "error": "Not found" }.

**2.3 Search & category filter on Home (/) — driven by the URL**

- The Home page is a **Server Component** that reads searchParams (q, category) and renders only the matching products — so /?q=phone and /?category=Audio already contain the filtered list in the server HTML.
- Controls: a plain &lt;form method="get" action="/"&gt; with search-input (name="q"), category-select (a &lt;select name="category"&gt; whose first option is "All" with empty value) and btn-search. No client-side state is needed for this — the URL is the state.
- If nothing matches, show data-testid="no-results" instead of the list.

**2.4 Favorites table in Supabase (with RLS)**

In the Supabase **SQL Editor** of your Lab 3 project run this script exactly (table name favorites, these column names), then keep a copy of it in your repo as supabase/favorites.sql:

<div class="joplin-table-wrapper"><table><thead><tr><th><pre><code>create table public.favorites (
  id         bigint generated always as identity primary key,
  user_id    uuid    not null default auth.uid() references auth.users(id) on delete cascade,
  product_id integer not null,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);
alter table public.favorites enable row level security;
create policy "read own"   on public.favorites for select to authenticated using (auth.uid() = user_id);
create policy "insert own" on public.favorites for insert to authenticated with check (auth.uid() = user_id);
create policy "delete own" on public.favorites for delete to authenticated using (auth.uid() = user_id);</code></pre></th></tr></thead></table></div>

- RLS is what keeps users apart: a user can only read, add and remove **their own** rows, and a visitor who is not logged in sees nothing. Do **not** add a policy for the anon role and do **not** disable RLS.

**2.5 FavoritesContext (useContext + useReducer)**

- Create contexts/FavoritesContext.tsx with a **reducer** (useReducer) handling at least three actions: SET (replace the whole list), ADD, REMOVE. State is the list of favorite product ids. It exposes favorites, isFavorite(id) and toggleFavorite(id) through a useFavorites() hook.
- Wrap the app with &lt;FavoritesProvider&gt; in app/layout.tsx, **inside** &lt;AuthProvider&gt; (it needs the logged-in user).
- When the user logs in, load their rows with supabase.from("favorites").select("product_id") and dispatch SET. When the user logs out, dispatch SET with an empty list. Both must happen automatically when user changes.
- toggleFavorite updates the UI **optimistically** (dispatch first), then calls insert / delete on Supabase; if Supabase returns an error, dispatch the opposite action to roll back.
- Each product card (Home and detail page) has a heart button data-testid="btn-favorite" with aria-pressed="true" when favorited and "false" otherwise. If nobody is logged in, clicking it sends the visitor to /login (router.push("/login")).

**2.6 Favorites page & header**

- Create route /favorites, protected exactly like /account in Lab 3 (loading → render nothing; no user → router.replace("/login")). When logged in it shows data-testid="favorites-page" and one data-testid="favorite-item" per favorite product (name + price + a link to its detail page), or data-testid="favorites-empty" when there are none.
- Header, **logged in only**: a link data-testid="link-favorites" to /favorites that contains data-testid="favorites-count" with the number of favorites. Logged out: the Lab 3 header is unchanged (btn-login, btn-register).

**2.7 Loading and error handling**

- app/loading.tsx — a loading UI with data-testid="loading".
- app/error.tsx — a Client Component ("use client") that receives error and reset, shows data-testid="error-boundary" and a button data-testid="btn-retry" that calls reset().

**2.8 Carried over**

- Tailwind CSS, at least two ShadCN UI components, the responsive product grid, and all Lab 3 testids / routes (/login, /register, /account, error-auth, user-email, btn-logout …) still work. Environment variables still come from NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (no keys hardcoded in your code).

# **3\. Required test hooks (fixed names)**

All Lab 3 testids and routes stay the same. These are added for Lab 5.

<div class="joplin-table-wrapper"><table><thead><tr><th><p><strong>Where</strong></p></th><th><p><strong>Element</strong></p></th><th><p><strong>data-testid / name</strong></p></th></tr><tr><th><pre><code>/products/[id]</code></pre></th><th><p>Page container, name, price, description, category</p></th><th><p>product-detail, detail-name, detail-price, detail-description, detail-category</p></th></tr><tr><th><pre><code>/products/[id]</code></pre></th><th><p>Link back to Home</p></th><th><pre><code>link-back</code></pre></th></tr><tr><th><p>any unknown route / id</p></th><th><p>Not-found page</p></th><th><pre><code>not-found</code></pre></th></tr><tr><th><p>/ product cards</p></th><th><p>Link to the detail page / heart button</p></th><th><p>link-detail, btn-favorite (with aria-pressed)</p></th></tr><tr><th><p>/ filter form</p></th><th><p>Search box, category select, submit, empty state</p></th><th><p>search-input (name q), category-select (name category), btn-search, no-results</p></th></tr><tr><th><p>header (logged in)</p></th><th><p>Favorites link and counter</p></th><th><p>link-favorites, favorites-count</p></th></tr><tr><th><pre><code>/favorites</code></pre></th><th><p>Page, one row per favorite, empty state</p></th><th><p>favorites-page, favorite-item, favorites-empty</p></th></tr><tr><th><p>app/loading.tsx, app/error.tsx</p></th><th><p>Loading UI, error UI and retry button</p></th><th><p>loading, error-boundary, btn-retry</p></th></tr></thead></table></div>

Use the existing Lab 2 testids (product-list, product-card, product-name, product-price …) unchanged for the Home grid.

# **4\. Submission**

Submit **one real Word file** (.docx or .doc) named with your student code. Copy this template exactly:

<div class="joplin-table-wrapper"><table><thead><tr><th><pre><code>Student Code: QE200012
Full Name: Nguyen Van A
GitHub Repository URL: https://github.com/username/repo-name
Vercel Production URL: https://your-project.vercel.app
Supabase Project URL: https://xxxxxxxxxxxx.supabase.co
Supabase anon (public) key: eyJhbGciOi...
Test account email: grader.qe200012@example.com
Test account password: Test1234!</code></pre></th></tr></thead></table></div>

**Only the anon/public key.** Never submit the service_role / secret key.

- Same rules as Lab 3 apply to the GitHub and Vercel links: public repo (Next.js at the repository root), the **production** URL of the project (not a per-deployment link), no login / share wall. Make sure Vercel has your two NEXT_PUBLIC_SUPABASE_\* environment variables set and that you **redeployed** after adding them.
- Use the **same Supabase project and test account** as Lab 3 — the account must still exist, and "Confirm email" must still be off. The favorites table must exist in that project.
- Your repository must be on its **default branch** — that is the branch graded (check on GitHub which branch is shown by default, and that Vercel deploys that same branch).

# **5\. Grading (10 points)**

| **#** | **Criterion**                          | **How it is checked**                                                                                                                                                                                                                                                                                     | **Points** |
| ----- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1     | Submission & deployment                | 0.25: valid .docx, template filled, plain https:// links<br><br>0.25: GitHub public + Next.js at root; Vercel production URL opens with no wall                                                                                                                                                           | 0.5        |
| ---   | ---                                    | ---                                                                                                                                                                                                                                                                                                       | ---        |
| 2     | Favorites table & RLS, tested for real | 0.5: the test account can add a favorite and read it back<br><br>0.5: adding a favorite for another user id is rejected<br><br>0.5: a visitor who is not logged in cannot see or add rows                                                                                                                 | 1.5        |
| ---   | ---                                    | ---                                                                                                                                                                                                                                                                                                       | ---        |
| 3     | Server-rendered detail page            | 0.5: /products/\[id\] is a Server Component with generateStaticParams<br><br>0.5: product name, price and testids are in the server HTML for several ids<br><br>0.5: &lt;title&gt; is &lt;name&gt; \| &lt;store&gt; and differs per product<br><br>0.5: unknown id → HTTP 404 with not-found + notFound() | 2.0        |
| ---   | ---                                    | ---                                                                                                                                                                                                                                                                                                       | ---        |
| 4     | API routes                             | 0.5: /api/products returns a JSON array (≥6 items, required fields)<br><br>0.5: ?q= filter, case-insensitive<br><br>0.5: ?category= filter (and combined with q)<br><br>0.5: /api/products/\[id\] returns an object; unknown id → 404 + JSON error                                                        | 2.0        |
| ---   | ---                                    | ---                                                                                                                                                                                                                                                                                                       | ---        |
| 5     | URL-driven search on Home              | 0.5: server HTML of /?q=… / /?category=… contains only matching cards<br><br>0.5: GET form with search-input, category-select, btn-search; no-results when empty                                                                                                                                          | 1.0        |
| ---   | ---                                    | ---                                                                                                                                                                                                                                                                                                       | ---        |
| 6     | FavoritesContext (useReducer)          | 0.5: reducer with SET / ADD / REMOVE, provider inside AuthProvider in the layout<br><br>0.5: loads on login, clears on logout, optimistic update with rollback<br><br>0.5: btn-favorite with aria-pressed; logged-out click → /login                                                                      | 1.5        |
| ---   | ---                                    | ---                                                                                                                                                                                                                                                                                                       | ---        |
| 7     | Favorites page & header                | 0.5: /favorites protected; favorites-page / favorite-item / favorites-empty<br><br>0.5: header link-favorites + favorites-count (logged in only)                                                                                                                                                          | 1.0        |
| ---   | ---                                    | ---                                                                                                                                                                                                                                                                                                       | ---        |
| 8     | Loading & error boundaries             | 0.25: loading.tsx with loading<br><br>0.25: error.tsx client component with error-boundary, btn-retry calling reset()                                                                                                                                                                                     | 0.5        |
| ---   | ---                                    | ---                                                                                                                                                                                                                                                                                                       | ---        |
|       | Total                                  |                                                                                                                                                                                                                                                                                                           | 10.0       |
| ---   | ---                                    | ---                                                                                                                                                                                                                                                                                                       | ---        |

**Grading rules**

- Items 2, 3, 4 and 5 are checked **live**: HTML, status codes and JSON are fetched from your Vercel production URL, and the favorites table is called through Supabase's public REST API with your test account (one throwaway row is inserted and deleted again). The checks use only what is in your submission.
- Items 3 (first and last parts), 6, 7 and 8 are graded from your **source code** (default branch). Client-side behaviour such as the optimistic update is checked by reading the code, so it must be genuinely implemented.
- If Lab 3 is broken (login does not work, AuthContext missing), items 2, 6 and 7 cannot be earned. If the project is not a Next.js App Router project, items 3, 4, 5 and 8 score 0.
- Hardcoded Supabase keys, a service_role key anywhere in the repo, or RLS disabled on favorites costs the related points. Submissions may be compared for code similarity. Copied work receives 0.

# **6\. Self-check before you submit**

- Open https://&lt;your-site&gt;/products/1 and "View page source": the product name and price are in the HTML, and the browser tab title is the product name.
- /products/9999 shows your not-found page and the browser DevTools Network tab shows status 404.
- https://&lt;your-site&gt;/api/products, /api/products?q=&lt;word&gt;, /api/products?category=&lt;name&gt; and /api/products/1 all return the right JSON; /api/products/9999 returns 404.
- https://&lt;your-site&gt;/?q=&lt;word&gt; shows only matching products in the page source; a search with no match shows the empty state.
- The favorites table exists with RLS **on** and exactly the three policies from the script; in Supabase → Table editor you can see your own row after clicking a heart.
- Clicking the heart while logged out sends you to /login; after logging in the heart state and the header counter match what is in the database, and after logout the counter disappears.
- Refresh /favorites while logged in: the list comes back. Visit it logged out: you are sent to /login.
- loading.tsx, error.tsx and not-found.tsx exist, and error.tsx starts with "use client".
- Vercel has the two NEXT_PUBLIC_SUPABASE_\* variables and the latest commit of the default branch is deployed. No service_role key anywhere.