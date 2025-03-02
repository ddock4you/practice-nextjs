import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Supabase 클라이언트를 생성하고 미들웨어를 적용하는 함수
 *
 * @param request - Next.js의 요청 객체
 * @returns {Promise<NextResponse>} 처리된 응답 객체를 반환
 *
 * @description
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. Next.js 응답 객체 생성
 * 2. Supabase 서버 클라이언트 생성
 * 3. 쿠키 관리 (get, set, remove)
 * 4. 사용자 인증 토큰 갱신
 *
 * @example
 * ```typescript
 * const response = await applyMiddlewareSupabaseClient(request);
 * ```
 *
 * @throws {Error} Supabase URL 또는 ANON KEY가 설정되지 않은 경우 발생할 수 있음
 */
export const applyMiddlewareSupabaseClient = async (request: NextRequest) => {
  // 기본 응답 객체 생성
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // 쿠키 가져오기
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        // 쿠키 설정하기
        set(name: string, value: string, options: CookieOptions) {
          // 요청과 응답 모두에 쿠키 업데이트
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        // 쿠키 제거하기
        remove(name: string, options: CookieOptions) {
          // 요청과 응답에서 쿠키 제거
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // 현재 사용자의 인증 토큰 갱신
  await supabase.auth.getUser();

  return response;
};

// Next.js 미들웨어 함수
export async function middleware(request) {
  return await applyMiddlewareSupabaseClient(request);
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    // 다음 경로들을 제외한 모든 요청에 미들웨어 적용:
    // - _next/static (정적 파일)
    // - _next/image (이미지 최적화 파일)
    // - favicon.ico (파비콘)
    // - 이미지 파일들 (.svg, .png, .jpg, .jpeg, .gif, .webp)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
