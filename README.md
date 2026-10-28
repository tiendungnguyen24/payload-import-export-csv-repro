# plugin-import-export: CSV issues with array fields

Minimal reproduction on Payload 3.92.1 (`create-payload-app -t blank`, SQLite).

`src/collections/Posts.ts` has two array fields:

- `items`: plain array.
- `tags`: array with a field-level `hooks.beforeExport` that returns one string.

`src/seed.ts` creates 100 posts with 1 item each, then `post 101` with 3 items and 2 tags.
With the default `batchSize` of 100, `post 101` is in the second batch of a streamed CSV download.

## Run

```sh
pnpm install
cp .env.example .env   # DATABASE_URL=file:./app.db, any PAYLOAD_SECRET
pnpm payload run src/seed.ts
pnpm dev
./repro.sh             # in a second terminal
```

## Result

```
Header:
id,title,items_0_label,items_0_id,tags_0_label,tags_0_id,updatedAt,tags,createdAt

Row of post 101:
101,post 101,a,<id>,,,<date>,x | y,<date>
```

1. `post 101` has 3 items, but the CSV has only `items_0_*` columns: items `b` and `c` are lost without an error. The JSON export of the same query has all 3 items.
2. `tags_0_label` and `tags_0_id` are always empty: the `beforeExport` hook already returns `tags` as one column.
