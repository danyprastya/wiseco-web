export default function AboutUsHero() {
  return (
    <section
      className="h-[350px] relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/bg-aboutus.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* White Overlay 40% */}
      <div className="absolute inset-0 bg-white opacity-40"></div>
    </section>
  );
}
