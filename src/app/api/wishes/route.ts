import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/r2';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const fromName = formData.get('from_name') as string;
        const toName = formData.get('to_name') as string;
        const message = formData.get('message') as string;
        const template = formData.get('template') as string || 'classic';
        const musicUrl = formData.get('music_url') as string || null;
        const file = formData.get('background') as File | null;

        if (!fromName || !toName) {
            return NextResponse.json(
                { error: 'Nama pengirim dan penerima wajib diisi' },
                { status: 400 }
            );
        }

        const slug = nanoid(8);
        let backgroundUrl: string | null = null;

        // Upload image if provided
        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `${slug}-${file.name}`;
            backgroundUrl = await uploadImage(buffer, filename, file.type);
        }

        const { error } = await supabase.from('eid_wishes').insert({
            slug,
            from_name: fromName,
            to_name: toName,
            message: message || null,
            background_url: backgroundUrl,
            template: template,
            music_url: musicUrl,
        });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Gagal menyimpan ucapan' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            url: `/u/${slug}`,
            background_url: backgroundUrl,
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
