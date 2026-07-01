export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { seedMissingCmsEntries } = await import('@/lib/cms');
    seedMissingCmsEntries().catch((err) => console.error('Startup CMS seed failed:', err));
  }
}
