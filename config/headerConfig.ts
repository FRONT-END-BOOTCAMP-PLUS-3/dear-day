export type HeaderType = "main" | "back" | "detail" | "dynamic";

interface HeaderConfig {
  type: HeaderType;
  title?: string; // backHeader, detailHeader일 때 필요
}

// 정규식 기반 동적 경로 매칭을 위한 배열
export const headerConfig: { pattern: RegExp; config: HeaderConfig }[] = [
  { pattern: /^\/$/, config: { type: "main" } },
  { pattern: /^\/event\/[^/]+$/, config: { type: "detail" } }, // /event/[event_id]
  { pattern: /^\/join$/, config: { type: "back", title: "회원가입" } },
  { pattern: /^\/list$/, config: { type: "back", title: "생카 목록" } },
  { pattern: /^\/login$/, config: { type: "back", title: "" } },
  {
    pattern: /^\/search\/[^/]+$/, // /search/[star_id]
    config: { type: "back", title: "" },
  },

  { pattern: /^\/member\/$/, config: { type: "main" } },
  {
    pattern: /^\/member\/course$/,
    config: { type: "back", title: "내 코스" },
  },
  {
    pattern: /^\/member\/course\/create$/,
    config: { type: "back", title: "코스 만들기" },
  },
  {
    pattern: /^\/member\/course\/[^/]+$/,
    config: { type: "dynamic", title: "코스이름" },
  }, // /member/course/[course_id]
  {
    pattern: /^\/member\/course\/[^/]+\/edit$/,
    config: { type: "back", title: "코스 수정" },
  }, // /member/course/[courseId]/edit
  { pattern: /^\/member\/event\/[^/]+$/, config: { type: "back", title: "" } }, // /member/event/[event_id]
  { pattern: /^\/member\/list$/, config: { type: "back", title: "생카 목록" } },
  {
    pattern: /^\/member\/manage$/,
    config: { type: "back", title: "생카 관리" },
  },
  {
    pattern: /^\/member\/manage\/[^/]+$/,
    config: { type: "back", title: "생카 관리" },
  }, // /member/manage/[event_id]
  { pattern: /^\/member\/mypage$/, config: { type: "back", title: "프로필" } },
  {
    pattern: /^\/member\/mypage\/setting$/,
    config: { type: "back", title: "" },
  },

  {
    pattern: /^\/member\/register_event$/,
    config: { type: "back", title: "생카 등록하기" },
  },
  {
    pattern: /^\/member\/register_star$/,
    config: { type: "back", title: "스타 등록하기" },
  },
  {
    pattern: /^\/member\/search_star$/,
    config: { type: "back", title: "스타 검색" },
  },
  {
    pattern: /^\/member\/search_star\/[^/]+$/,
    config: { type: "back", title: "" },
  },
];
