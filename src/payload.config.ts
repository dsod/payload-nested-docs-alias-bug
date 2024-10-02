// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    nestedDocsPlugin(
      {
        collections: ['users'],
      }
    )
  ],
  onInit: async (payload) => {
    const {totalDocs} = await payload.find({collection: 'users', limit: 1})
    if (totalDocs > 0) return;
    await Promise.all([
      payload.create({
        collection: 'users',
        data: {
          email: 'test1@example.com',
          password: 'test1',
      }}),
    ])
  }
})
