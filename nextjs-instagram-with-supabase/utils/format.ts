export function getKoreanTime() {
  const now = new Date();
  const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간대(UTC+9)의 밀리초
  const koreanDate = new Date(now.getTime() + koreaTimeDiff);
  return koreanDate.toISOString();
}

export function convertTime(time: string) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}