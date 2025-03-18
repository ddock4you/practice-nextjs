// Next.js 서버 응답을 처리하기 위한 NextResponse 클래스 임포트
import { NextResponse } from 'next/server';
// 서버에서 Supabase 클라이언트를 생성하기 위한 유틸리티 함수 임포트
import { createServerSupabaseClient } from '@/utils/supabase/server';

// 이 라우트의 GET 요청 핸들러 함수 정의
export async function GET(request: Request) {
  // 요청 URL을 파싱하여 URL 객체 생성
  const requestUrl = new URL(request.url);
  // URL 쿼리 파라미터에서 'code' 값 추출
  const code = requestUrl.searchParams.get('code');

  // 인증 코드가 존재하는 경우 실행
  if (code) {
    // 서버 측 Supabase 클라이언트 생성
    const supabase = await createServerSupabaseClient();
    // 인증 코드를 사용하여 Supabase 세션으로 교환 (로그인 완료)
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 처리 완료 후 원래 사이트 루트 경로로 리다이렉트
  return NextResponse.redirect(requestUrl.origin);
}
