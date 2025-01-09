// src/config/index.js
const config = {
  api: {
    listings: 'https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/listings_parsed.json',
    tracker: 'https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/simplify/parsed.json'
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
      { column: 'date_updated', order: 'desc' }
    ],
    pagination: {
      itemsPerPage: 25
    }
  }
};

export default config;