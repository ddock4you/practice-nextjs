"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "types_db";

/**
 * 서버 사이드 작업을 위한 Supabase 클라이언트 인스턴스를 생성합니다
 *
 * @param cookieStore - Next.js의 쿠키 저장소 인스턴스, 기본값은 cookies()
 * @param admin - 서비스 역할 키 또는 익명 키 사용 여부를 결정하는 불리언 플래그, 기본값은 false
 * @returns 서버 사이드 사용을 위해 구성된 Supabase 클라이언트 인스턴스를 반환하는 Promise
 *
 * @example
 * const supabase = await createServerSupabaseClient();
 * 또는 관리자 권한으로
 * const adminSupabase = await createServerSupabaseClient(cookies(), true);
 *
 * @remarks
 * - Supabase URL과 인증 키에 환경 변수 사용
 * - 인증 상태를 위한 쿠키 관리 처리
 * - 서버 컴포넌트 컨텍스트에 대한 오류 처리 포함
 */
export const createServerSupabaseClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies(),
  admin: boolean = false
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin ? process.env.NEXT_SUPABASE_SERVICE_ROLE! : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

export const createServerSupabaseAdminClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies()
) => {
  return createServerSupabaseClient(cookieStore, true);
};
