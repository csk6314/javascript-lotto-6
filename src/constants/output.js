function deepFreeze(object) {
  var propNames = Object.getOwnPropertyNames(object);

  for (let name of propNames) {
    let value = object[name];

    object[name] =
      value && typeof value === "object" ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

export const OUTPUT_MSG = deepFreeze({
  BUYING_MSG: "개를 구매했습니다.",
  RESULT_MSG: {
    GUIDE: {
      TITLE: "당첨내역",
      LINE: "---",
    },
    FIFTH: "3개 일치 (5,000원) - *개",
    FOURTH: "4개 일치 (50,000원) - *개",
    THIRD: "5개 일치 (1,500,000원) - *개",
    SECOND: "5개 일치, 보너스 볼 일치 (30,000,000원) - *개",
    FIRST: "6개 일치 (2,000,000,000원) - *개",
    RETURN_RATE: "총 수익률은 *% 입니다.",
  },
});
