// src/config/index.js
const config = {
  api: {
    listings: 'https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/.github/scripts/listings.json',
  },
  defaults: {
    filters: [
      { column: 'date_posted', fromDate: '2024-01-01', toDate: '' },
      { column: 'active', active: true },
      {
        column: 'locations',
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
      { column: 'date_posted', order: 'desc' }
    ],
    pagination: {
      itemsPerPage: 25
    }
  }
};

export default config;