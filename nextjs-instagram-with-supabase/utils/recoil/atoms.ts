import { atom } from 'recoil';

// 사용자 온라인 상태를 위한 인터페이스 정의
interface PresenceData {
  onlineAt: string; // ISO 8601 형식의 날짜 문자열
  presence_ref: string; // 연결 참조 ID
}

// 전체 상태 타입 - Record 유틸리티 타입을 활용하여 동적 키 처리
interface PresenceState {
  [userId: string]: PresenceData[];
}

export const selectedUserIdState = atom<string | null>({
  key: 'selectedUserIdState',
  default: null,
});

export const selectedUserIndexState = atom<number | null>({
  key: 'selectedUserIndexState',
  default: null,
});

export const presenceState = atom<PresenceState | null>({
  key: 'presenceState',
  default: null,
});
