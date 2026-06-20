export default function PortfolioHero() {
  return (
    <section className="bg-gradient-to-b from-primary/5 via-background to-background grid-bg page-hero reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <span className="font-inter text-xs sm:text-sm uppercase tracking-wider text-primary font-medium mb-3 sm:mb-4 block">
          Our Work
        </span>
        <h1 className="font-bricolage text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
          Building Scalable
          <br />
          <span className="gradient-text">Digital Experiences</span>
        </h1>
        <p className="font-inter text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-3 sm:mb-4 px-2">
          Web applications, SaaS platforms, enterprise websites, and industry-specific solutions — transforming ideas into powerful digital platforms.
        </p>
        <p className="font-inter text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
          Explore our portfolio across B2B, finance, education, healthcare, real estate, pharma, industrial, infrastructure, mining, and more.
        </p>
      </div>
    </section>
  );
}
