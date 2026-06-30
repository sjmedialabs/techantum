import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import BlogHero from './components/BlogHero';
import BlogGrid from './components/BlogGrid';

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-20">
        <BlogHero />
        <BlogGrid />
      </main>
      <SiteFooter />
    </>
  );
}
