import { createClient } from '@supabase/supabase-js'

// 환경변수에서 Supabase 프로젝트 URL과 Anonymous 키를 가져와요 ! -> 해당 일자의 수업 자료를 참고하세요.
// .env.local 파일에 다음과 같이 설정해야 해요.
// NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// createClient 함수로 Supabase 클라이언트를 생성해요.
// 이 클라이언트를 통해 데이터베이스 작업(CRUD)을 수행할 수 있어요.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

