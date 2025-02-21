export type HeaderType = "main" | "back" | "detail" | "dynamic";

interface HeaderConfig {
  type: HeaderType;
  title?: string; // backHeader일 때 필요
}

// 경로별 헤더 설정
export const headerConfig: Record<string, HeaderConfig> = {
  "/": { type: "main" },
  "/event/[event_id]": { type: "detail" },
  "/join": { type: "back", title: "회원가입" },
  "/list": { type: "back", title: "생카 목록" },
  "/login": { type: "back", title: "프로필" },
  "/mypage": { type: "back", title: "" },
  "/search": { type: "dynamic", title: "사람이름" },

  "/member/": { type: "main" },
  "/member/course": { type: "back", title: "코스 만들기" },
  "/member/course/create": {
    type: "dynamic",
    title: "코스이름",
  },
  "/member/course/[course_id]": {
    type: "dynamic",
    title: "코스이름",
  },
  "/member/course/[course_id]/edit": {
    type: "dynamic",
    title: "코스이름",
  },
  "/member/event/[event_id]": { type: "back", title: "" },
  "/member/list": { type: "back", title: "생카 목록" },
  "/member/manage": { type: "back", title: "생카 관리" },
  "/member/manage/[event_id]": { type: "back", title: "생카 관리" },
  "/member/mypage": { type: "back", title: "프로필" },
  "/member/register_event": { type: "back", title: "생카 등록하기" },
  "/member/register_star": { type: "back", title: "스타 등록하기" },
  "/member/search": { type: "dynamic", title: "사람이름" },
  "/member/search_star": { type: "back", title: "스타 검색" },
};
