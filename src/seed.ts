import config from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })

await payload.delete({ collection: 'posts', where: {} })
await payload.delete({ collection: 'users', where: {} })
await payload.create({
  collection: 'users',
  data: { email: 'dev@example.com', password: 'test' },
})

// 100 posts with 1 item each: the first export batch (batchSize 100)
for (let i = 1; i <= 100; i++) {
  await payload.create({
    collection: 'posts',
    data: { title: `post ${i}`, items: [{ label: 'a' }], tags: [{ label: 'x' }] },
  })
}
// post 101 lands in batch 2 and has 3 items
await payload.create({
  collection: 'posts',
  data: {
    title: 'post 101',
    items: [{ label: 'a' }, { label: 'b' }, { label: 'c' }],
    tags: [{ label: 'x' }, { label: 'y' }],
  },
})

payload.logger.info('Seeded 1 user and 101 posts')
process.exit(0)
