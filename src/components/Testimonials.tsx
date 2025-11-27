import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-16">Testimonies</h2>
        <div className="pb-20">
          {/* Torch Testimony */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Profile Section */}
              <div className="bg-gradient-to-br from-primary to-primary-dark p-8 lg:p-12 flex flex-col items-center justify-center text-white text-center">
                {/* Profile Image Placeholder */}
                <div className="w-32 h-32 bg-white/20 rounded-full mb-6 flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>

                <h3 className="text-2xl font-bold mb-2">Ben Wirawan</h3>
                <p className="text-blue-100 text-lg mb-4">CEO and Co-founder</p>
                <div className="text-xl font-semibold">Torch</div>
              </div>

              {/* Testimony Content */}
              <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-6xl text-primary mb-6">"</div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Bersama wise dilakukan pengecekan fundamental bisnis, mulai
                  dari finance, management, reputasi, kompetitor, dan stock
                  opname, bahkan dicek juga SOP pengembangan retail.
                </p>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Sebelumnya revenue Torch hanya dari toko online saja, saat ini
                  sedang mengembangkan toko offline, dan Alhamdulillah sudah ada
                  6 toko offline.
                </p>

                <p className="text-gray-700 text-lg leading-relaxed">
                  Setahun setelah pendampingan dengan wise, Torch juga berhasil
                  dapat sumber pendanaan dari investor baru.
                </p>

                <div className="text-6xl text-primary text-right mt-6">"</div>
              </div>
            </div>

            {/* Company Image/Logo Section */}
            <div className="bg-gray-50 p-6">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 px-8 py-3 rounded-lg">
                  <span className="text-white font-bold text-2xl">TORCH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional testimonials can be added here */}
        </div>
      </div>
    </section>
  );
}
