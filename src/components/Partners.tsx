export default function Partners() {
  const strategicPartners = [
    { name: "Al Kahf", logo: "/images/partners/alkahf.png" },
    { name: "Modestalk", logo: "/images/partners/modestalk.png" },
    // Add more partners as needed
  ];

  const mediaPartners = [
    // Add media partners
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-20">
          {/* Strategic Partners */}
          <div className="mb-16">
            <h2 className="section-title mb-12">Strategic Partners</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
              {/* Partner Logo Placeholders */}
              {[
                "Al Kahf",
                "Modestalk",
                "Partner 3",
                "Partner 4",
                "Partner 5",
              ].map((partner, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow h-24"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🤝</div>
                    <p className="text-xs text-gray-600">{partner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media Reviews */}
          <div>
            <h2 className="text-[40px] text-[#D79C60] text-center mb-12">
              Media Reviews
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {["Media 1", "Media 2", "Media 3", "Media 4"].map(
                (media, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow h-24"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">📰</div>
                      <p className="text-xs text-gray-600">{media}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
