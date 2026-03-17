import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
            <div className="text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-xl text-gray-600 mb-6">Ucapan tidak ditemukan</h2>
                <p className="text-gray-500 mb-8">
                    Maaf, kartu ucapan yang Anda cari tidak ada atau mungkin sudah dihapus.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                    🏠 Buat Kartu Ucapan Baru
                </Link>
            </div>
        </div>
    );
}
