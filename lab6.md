**Lab 6: Product Reviews & Ratings**

Class SE20B.NJS | Practical exam | 10 points | Deadline: \_**\_**\_**\_**\__

# **1\. Objectives**

- Extend your **Lab 5** project (same GitHub repository, same Vercel project, same Supabase project). Everything from Labs 5 — login, favorites, the detail page, the /api/products routes — must keep working.
- Let logged-in users **rate and review products**. Reviews live in a Supabase table protected by **Row Level Security** and database constraints; anyone can read them, only the author can change them.
- Build a **secured write API** in Next.js (POST /api/reviews) that checks the user's token, validates input with **zod**, and refreshes the cached product page with **revalidatePath**.
- Build the review form with **react-hook-form + zod** and keep the review list in a **ReviewsContext** (useReducer) that is filled with data fetched on the server.

# **2\. Requirements**

**2.1 Reviews table in Supabase (with RLS and constraints)**

In the Supabase **SQL Editor** of your Lab 5 project run this script exactly (table name **reviews**, these column names), then save a copy in your repo as supabase/reviews.sql:

<table><thead><tr><th><pre><code>create table public.reviews (
  id         bigint generated always as identity primary key,
  user_id    uuid     not null default auth.uid() references auth.users(id) on delete cascade,
  product_id integer  not null,
  rating     smallint not null check (rating between 1 and 5),
  comment    text     not null check (char_length(comment) between 1 and 500),
  author     text     not null default split_part(coalesce(auth.jwt() -&gt;&gt; 'email', ''), '@', 1),
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);
alter table public.reviews enable row level security;
create policy "read all"   on public.reviews for select to anon, authenticated using (true);
create policy "insert own" on public.reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "update own" on public.reviews for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own" on public.reviews for delete to authenticated using (auth.uid() = user_id);</code></pre></th></tr></thead></table>

- The rating range, comment length, **one review per user per product** and the four policies are the database's job — do not remove them and do not disable RLS. The author column stores only the part of the e-mail before the @, so full e-mail addresses are not shown publicly.

**2.2 Shared validation schema**

- Install zod, react-hook-form and @hookform/resolvers. Create **one** schema file, e.g. lib/reviewSchema.ts, exporting reviewSchema = { product_id: positive integer, rating: integer 1–5, comment: trimmed string 1–500 characters }.
- The same file is imported by **both** the API route (server) and the review form (client). Do not copy the rules into two places.

**2.3 Write API — POST /api/reviews**

- Authentication: the request carries Authorization: Bearer &lt;Supabase access token&gt;. Without a header, or with a token Supabase rejects (check it with supabase.auth.getUser(token)), respond **401** with { "error": "Unauthorized" }.
- Validation: parse the JSON body with reviewSchema.safeParse. If it fails (rating 0 or 6, rating not an integer, empty or longer-than-500 comment, missing product_id, body that is not JSON) respond **400** with { "error": "Invalid input", "issues": \[...\] }.
- Product check: if product_id is not one of your products respond **404** with { "error": "Product not found" }.
- Insert into reviews using a Supabase client created **with the user's token** (createClient(url, anonKey, { global: { headers: { Authorization: "Bearer " + token } } })) so Row Level Security applies. **Never use the service_role key.** user_id and author must come from the database defaults, not from the request.
- Success → **201** with the created row as JSON (id, product_id, rating, comment, author, created_at). A second review by the same user for the same product → **409** with { "error": "You already reviewed this product" } (map Postgres error code 23505).
- After a successful insert call revalidatePath("/products/" + product_id) so the cached detail page is rebuilt on its next request.

**2.4 Read API — GET /api/products/\[id\]/reviews**

- Known product → **200** and { "average": &lt;number rounded to 1 decimal, 0 when no reviews&gt;, "count": &lt;integer&gt;, "reviews": \[ ... \] } with the reviews **newest first**. Unknown product → **404** { "error": "Product not found" }.
- Read from Supabase with the anon key; share one helper (e.g. lib/reviews.ts) between this route and the detail page.

**2.5 Detail page /products/\[id\] shows the reviews (server-rendered)**

- Keep everything from Lab 5 (Server Component, generateStaticParams, dynamicParams = false, generateMetadata, notFound(), a real HTTP 404 for unknown ids).
- In the **server HTML** show the average (rating-average, e.g. 4.5), the number of reviews (review-count) and one review-item per review with review-author, review-rating and review-comment. With no reviews show reviews-empty (and no review-item).
- The page is fetched on the server (anon key) and passes the list down as **props** (initialReviews) to the client part. Because the page is pre-rendered, a new review only appears thanks to revalidatePath from section 2.3 — that must work **without** a redeploy.

**2.6 ReviewsContext (useContext + useReducer)**

- Create contexts/ReviewsContext.tsx: &lt;ReviewsProvider productId initialReviews&gt; wraps the reviews section **of the detail page only** (not the whole app). Its reducer handles SET, ADD, UPDATE, REMOVE; the initial state comes from initialReviews (data fetched on the server).
- It exposes reviews, myReview (the logged-in user's review, found with useAuth()), submitReview(rating, comment), updateReview(rating, comment) and deleteReview() through a useReviews() hook.
- submitReview sends POST /api/reviews with the access token from useAuth() / supabase.auth.getSession() and, on success, dispatches ADD and calls router.refresh(). updateReview / deleteReview call Supabase directly (update / delete on your own row — RLS protects it); deleteReview is **optimistic** and rolls back if Supabase returns an error.

**2.7 Review form**

- Logged in and no review yet: show the form (useForm + zodResolver(reviewSchema)) with input-rating (a &lt;select&gt; or radio group, values 1–5), input-comment (a &lt;textarea&gt;) and btn-submit-review. Field errors appear in error-rating / error-comment **before** anything is sent; a server error (for example 409) appears in error-review; success shows review-success.
- Logged out: no form, instead a link link-login-to-review to /login.
- Logged in **with** a review: no new-review form. Your own review-item shows btn-edit-review and btn-delete-review (only on your own review, never on other people's).

**2.8 Carried over**

- Labs 3 and 5 still work: login/register//account, favorites and /favorites, /api/products, /api/products/\[id\] and the Home filter. Environment variables stay in NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY — Vercel must have them for the **server** part of the page too (reviews are read while the page is built).

# **3\. Required test hooks (fixed names)**

All Lab 3 and Lab 5 testids and routes stay the same. These are added for Lab 6.

| **Where**                     | **Element**                                    | **data-testid**                                             |
| ----------------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| `/products/[id]`              | Average rating, number of reviews, empty state | rating-average, review-count, reviews-empty                 |
| ---                           | ---                                            | ---                                                         |
| `/products/[id]`              | One row per review and its parts               | review-item, review-author, review-rating, review-comment   |
| ---                           | ---                                            | ---                                                         |
| /products/\[id\] (logged in)  | Form fields and submit                         | review-form, input-rating, input-comment, btn-submit-review |
| ---                           | ---                                            | ---                                                         |
| /products/\[id\] (form)       | Client-side errors, server error, success      | error-rating, error-comment, error-review, review-success   |
| ---                           | ---                                            | ---                                                         |
| /products/\[id\] (logged out) | Link to log in                                 | `link-login-to-review`                                      |
| ---                           | ---                                            | ---                                                         |
| /products/\[id\] (own review) | Edit and delete buttons                        | btn-edit-review, btn-delete-review                          |
| ---                           | ---                                            | ---                                                         |

The rating average is shown as a plain number (4.5, 3, 0 when there are no reviews) — no stars or extra text inside rating-average, so it can be read by a script. You may draw stars next to it.

# **4\. Submission**

Submit **one real Word file** (.docx or .doc) named with your student code. Copy this template exactly:

<table><thead><tr><th><pre><code>Student Code: QE200012
Full Name: Nguyen Van A
GitHub Repository URL: https://github.com/username/repo-name
Vercel Production URL: https://your-project.vercel.app
Supabase Project URL: https://xxxxxxxxxxxx.supabase.co
Supabase anon (public) key: eyJhbGciOi...
Test account email: grader.qe200012@example.com
Test account password: Test1234!</code></pre></th></tr></thead></table>

**Only the anon/public key.** Never submit the service_role / secret key, and never put it in your code or in Vercel.

- Same rules as before: public repo (Next.js at the repository root), the **production** URL of the project (not a per-deployment link), no login / share wall, plain https:// links, your full name filled in, values typed without \[ \].
- Use the **same Supabase project and test account** as Labs 3 and 5. Log in with that account once on your deployed site and make sure it can log in **before** you submit. The reviews table (script in 2.1) must exist in that project.
- Push to the repository's **default branch** and make sure Vercel has **redeployed** that exact commit to production. Your deployed site is what is graded for the API and page checks.

# **5\. Grading (10 points)**

| **#** | **Criterion**                                         | **How it is checked**                                                                                                                                                                                                                                                                                                                                                                                                | **Points** |
| ----- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1     | Submission & deployment                               | 0.25: valid .docx, template filled, plain https:// links<br><br>0.25: GitHub public + Next.js at root; Vercel production URL opens with no wall                                                                                                                                                                                                                                                                      | 0.5        |
| ---   | ---                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                  | ---        |
| 2     | Reviews table, constraints & RLS (live, via Supabase) | 0.5: test account can insert a review, read it back, change its comment and delete it<br><br>0.5: rating 0 / 6 and an empty comment are rejected by the database<br><br>0.5: a second review of the same product by the same user is rejected<br><br>0.5: inserting a review with another user's user_id is rejected<br><br>0.5: a visitor who is not logged in can read reviews but cannot insert, update or delete | 2.5        |
| ---   | ---                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                  | ---        |
| 3     | POST /api/reviews (live)                              | 0.5: no token or a wrong token → 401<br><br>0.5: invalid input (rating 0/6/2.5, empty comment, missing product_id, bad JSON) → 400 with error<br><br>0.5: valid review → 201 with the created row; unknown product → 404<br><br>0.5: duplicate review → 409                                                                                                                                                          | 2.0        |
| ---   | ---                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                  | ---        |
| 4     | GET /api/products/\[id\]/reviews (live)               | 0.5: average (1 decimal), count and reviews (newest first) match the database after the test review is inserted<br><br>0.5: unknown product → 404 JSON error                                                                                                                                                                                                                                                         | 1.0        |
| ---   | ---                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                  | ---        |
| 5     | Reviews in the server-rendered page (live)            | 0.5: server HTML of a product with reviews contains rating-average, review-count and review-items<br><br>0.5: after a review is posted through the API the page shows the new count (revalidation works, no redeploy)<br><br>0.5: a product without reviews shows reviews-empty and no review-item                                                                                                                   | 1.5        |
| ---   | ---                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                  | ---        |
| 6     | Review form (code)                                    | 0.5: one shared zod schema used by both the form (react-hook-form + zodResolver) and the API route<br><br>0.5: logged-in / logged-out behaviour, error-rating, error-comment, error-review, review-success                                                                                                                                                                                                           | 1.0        |
| ---   | ---                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                  | ---        |
| 7     | ReviewsContext (code)                                 | 0.5: ReviewsProvider around the reviews section only, reducer with SET / ADD / UPDATE / REMOVE, initial state from server props<br><br>0.5: myReview, btn-edit-review / btn-delete-review only on own review, optimistic delete with rollback, router.refresh() after submit                                                                                                                                         | 1.0        |
| ---   | ---                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                  | ---        |
| 8     | Labs 3 & 5 still work                                 | 0.5: /api/products, /api/products/1, /products/1 return 200, an unknown product id is still a real 404, and the Lab 5 favorites / auth files and testids are still present                                                                                                                                                                                                                                           | 0.5        |
| ---   | ---                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                  | ---        |
|       | Total                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                      | 10.0       |
| ---   | ---                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                  | ---        |

**Grading rules**

- Items 2, 3, 4, 5 and 8 are checked **live** against your Supabase project and your Vercel production URL, using the test account you submit. The checks insert one throwaway review for that account on one product and delete it afterwards.
- Items 6 and 7 are graded from your **source code** (default branch). Behaviour such as the optimistic delete is checked by reading the code, so it must be genuinely implemented.
- If the test account cannot log in, every part of item 2 and item 3 that needs it scores 0 — test it before submitting. If your Vercel site is behind a login, is not the production URL, or does not contain your latest code, the live items score 0.
- A service_role key anywhere in your code or repository, RLS disabled on reviews, or user_id taken from the request body costs the related points. Submissions may be compared for code similarity. Copied work receives 0.

# **6\. Self-check before you submit**

- The reviews table exists with RLS **on** and the four policies; in Supabase → Table editor you can see your review after posting one.
- Trying rating 0 or 6 directly in the Supabase table editor is refused; so is a second review for the same product.
- POST /api/reviews without a token returns 401; with a token but rating 9 returns 400; a valid one returns 201; sending it again returns 409; an unknown product_id returns 404.
- https://&lt;your-site&gt;/api/products/1/reviews returns { average, count, reviews }; /api/products/9999/reviews returns 404.
- "View page source" of /products/1 shows rating-average, review-count and the review text in the HTML (not added later by JavaScript).
- After posting a review the page shows the new count after a refresh — without redeploying.
- Logged out you see link-login-to-review, logged in with no review you see the form, and with a review you see Edit / Delete only on your own.
- The form shows errors for an empty comment or no rating **before** sending anything.
- Labs 3 and 5 still pass (login, favorites, /products/9999 is still a real 404). No service_role key anywhere; Vercel has the two NEXT_PUBLIC_SUPABASE_\* variables and the latest commit is deployed to production.