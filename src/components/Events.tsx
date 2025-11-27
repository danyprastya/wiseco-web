import Image from "next/image";
import Link from "next/link";

export default function Events() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-16">Events</h2>
        <div className="pb-20">
          {/* Archipreneur Event */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 lg:h-auto bg-gradient-to-br from-amber-100 to-orange-200">
                {/* Placeholder - Replace with actual event image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🏗️</div>
                    <p className="text-gray-600">Archipreneur Event</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-primary mb-4">
                  Archipreneur
                </h3>

                <h4 className="text-xl font-semibold text-gray-800 mb-6">
                  ARSWOW TALKSHOW : ARCHIPRENEUR 2025
                </h4>

                <p className="text-gray-700 mb-6">
                  Exhibition and Talkshow Architects with:
                </p>

                {/* Speakers List */}
                <div className="space-y-2 mb-8 text-gray-700">
                  <p>• Ar. Novriansyah Yakub, IAI | Founder Atelier Riri</p>
                  <p>• Rega Poetra | Founder KONARS+</p>
                  <p>• Rizky Wihardi | CEO wiseco.id</p>
                  <p>• Meizan Nataadiningrat | Co-founder KEUKEN</p>
                  <p>• Dendi Adhitya | Incinerator Center</p>
                </div>

                <p className="text-gray-700 mb-8">
                  <strong>Moderator:</strong> Wyra Tarigan - Founder & CEO Polux
                  Cabin
                </p>

                {/* Event Details */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🗓</span>
                    <div>
                      <strong>Date:</strong> Sabtu, 29 November 2025
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🕒</span>
                    <div>
                      <strong>Time:</strong> 09.00 - 14.00 WIB
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <strong>Where:</strong> Nerd Laboratory Laswi Heritage
                      Bandung | Jl Sukabumi No.20 Bandung
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  Organized by ARSWOW
                </p>

                {/* Contact for RSVP */}
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-gray-700">
                    <strong>For More Info RSVP</strong>
                    <br />
                    CP: Miftah - 089672182558
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
