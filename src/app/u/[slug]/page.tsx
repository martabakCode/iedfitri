import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase, EidWish } from '@/lib/supabase';
import WishCard from '@/components/WishCard';
import NightBackground from '@/components/NightBackground';

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getWish(slug: string): Promise<EidWish | null> {
    const { data, error } = await supabase
        .from('eid_wishes')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) return null;
    return data as EidWish;
}

export default async function WishPage({ params }: PageProps) {
    const { slug } = await params;
    const wish = await getWish(slug);

    if (!wish) notFound();

    return (
        <div className="min-h-screen relative">
            <NightBackground />
            {/* Apple HIG: Back navigation with 44pt touch target */}
            <div className="fixed top-4 left-4 z-50">
                <Link
                    href="/"
                    className="
                        inline-flex items-center gap-2 
                        bg-white/10 backdrop-blur-sm border border-white/20 
                        px-5 py-3 
                        text-white hover:bg-white/20 
                        rounded-xl transition-all duration-200
                        min-h-[48px]
                    "
                >
                    <span className="text-xl">🏠</span>
                    <span className="font-medium">Buat Ucapan</span>
                </Link>
            </div>
            {/* Wish Card */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-24">
                <WishCard wish={wish} />
            </div>
        </div>
    );
}
