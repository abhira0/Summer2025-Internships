// src/config/index.js
const config = {
    api: {
      listings: 'https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/listings_parsed.json',
      tracker: 'https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/simplify/parsed.json',
      applications: '/api/applications',
      users: '/data/users.json'
    },
    auth: {
      tokenKey: 'jwt_token',
      tokenExpiry: 24 * 60 * 60 * 1000 // 24 hours
    },
    defaults: {
      filters: [
        { column: 'date', fromDate: '2024-01-01', toDate: '' },
        { column: 'active', active: true },
        {
          column: 'location',
          conditionType: 'AND',
          conditions: [
            { type: 'not-equals', value: 'canada' },
            { type: 'not-equals', value: 'remote in canada' },
            { type: 'not-regex', value: '^[a-zA-Z]+, uk$' },
            { type: 'not-regex', value: '^[a-zA-Z]+(?:, [a-za-z]+)?, canada$' }
          ]
        },
        { column: 'hidden', hidden: false },
        { column: 'applied', applied: false }
      ],
      sorts: [
        { column: 'date', order: 'desc' }
      ]
    }
};

export default config;

