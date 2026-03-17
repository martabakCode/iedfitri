import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TemplateType = 'classic' | 'modern' | 'minimal' | 'elegant';

export interface EidWish {
    id: string;
    slug: string;
    from_name: string;
    to_name: string;
    message: string | null;
    background_url: string | null;
    template: TemplateType;
    music_url: string | null;
    created_at: string;
}
