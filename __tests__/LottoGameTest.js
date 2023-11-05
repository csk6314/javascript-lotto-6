import LottoGame from "../src/controller/LottoGame";
import WinningLotto from "../src/model/WinningLotto";
import { Console, Random } from "@woowacourse/mission-utils";
import Input from "../src/view/Input";

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.pickUniqueNumbersInRange);
};

describe("LottoGame 기능 test", () => {
  test("로또번호와 당첨번호를 비교 후 등수 반환 test", async () => {
    //given
    const playerLotto = [1, 2, 3, 4, 5, 6];
    const INPUT_STRING = ["1,2,3,4,5,6", "7"];

    mockQuestions(INPUT_STRING);

    //when
    const game = new LottoGame();
    const winningNumbers = await Input.getWinningNumber();
    const winningLotto = new WinningLotto(winningNumbers);
    const bonusNumber = await Input.getBonusNumber();
    winningLotto.setBonusNumber(bonusNumber);
    const rank = game.compareLotto(playerLotto, winningLotto);

    //then
    expect(rank).toBe(1);
  });

  test("등수별 당첨된 로또 개수 저장 기능 test", async () => {
    //given
    const INPUT_STRING = ["4000", "3,5,11,41,42,43", "44"];

    mockQuestions(INPUT_STRING);
    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
    ]);

    //when
    const game = new LottoGame();
    await game.setPlayer();
    await game.setWinningLotto();

    //then
    expect(game.saveLottoRank()).toEqual([1, 0, 0, 0, 0, 3]);
  });
});