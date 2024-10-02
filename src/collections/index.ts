import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: ({req: {user}}) => {
      if (!user) {
        return false
      }
      return {
        'breadcrumbs.doc.id': { in: user.id }
      }
    },
  },
  fields: [
  ],
}