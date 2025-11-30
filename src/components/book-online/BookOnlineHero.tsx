export default function BookOnlineHero() {
  return (
    <section
      className="h-[200px] sm:h-[450px] md:h-[580px] lg:h-[701px] mt-[54px] sm:mt-[80px] relative flex flex-col items-center justify-center px-[20px] sm:px-0"
      style={{
        backgroundImage: "url('/images/bg-book-online.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Coming Soon Text */}
      <div
        className="relative z-10 text-center"
        style={{
          fontFamily: "Avenir, sans-serif",
          letterSpacing: "0.7em",
          color: "#FFFFFF",
        }}
      >
        <span className="text-[10px] sm:text-[40px] md:text-[50px] lg:text-[60px]">
          COMING SOON
        </span>
      </div>
    </section>
  );
}
