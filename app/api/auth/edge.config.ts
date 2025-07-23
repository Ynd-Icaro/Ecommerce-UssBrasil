// Edge Runtime configuration for auth routes
export const config = {
  runtime: 'edge',
  regions: ['iad1'], // Specify regions if needed
}

// Export runtime configuration for specific routes
export const authRouteConfig = {
  runtime: 'nodejs', // Use Node.js for Prisma compatibility
  dynamic: 'force-dynamic'
}
