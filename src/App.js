const MissionUtils = require('@woowacourse/mission-utils');
const messages = require('./Constants.js');
class App {
  constructor() {
    this.userNumber = '';
    this.computerNumber = '';
    this.isGameRestart = true;
  }

  play() {
    this.printGameStartMessage();
    this.init();
    this.gameStart();
  }

  init() {
    this.createComputerNumber();
    this.isGameFinished = false;
  }

  printGameStartMessage() {
    MissionUtils.Console.print(messages.GAME_START_MESSAGE);
  }

  createComputerNumber() {
    this.computerNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3).join('');
    MissionUtils.Console.print(this.computerNumber);
  }

  gameStart() {
    MissionUtils.Console.readLine(messages.ENTER_USER_NUMBER_MESSAGE, (input) => {
      this.getUserNumber(input);
      if (!this.isValidUserNumber(this.userNumber)) {
        throw new Error(messages.USER_NUMBER_ERROR_MESSAGE);
      } else {
        MissionUtils.Console.print('hi');
      }
    });
  }

  getUserNumber(input) {
    this.userNumber = input;
  }

  isValidUserNumber(number) {
    return this.isThreeDigits(number) && this.isCorrectRangeDigits(number) && this.isNotDuplicate;
  }

  isThreeDigits(number) {
    return number.length === 3;
  }

  isCorrectRangeDigits(number) {
    const possibleDigits = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 9);
    number.split('').forEach((digit) => {
      if (!possibleDigits.includes(+digit)) return false;
    });
    return true;
  }

  isNotDuplicate(number) {
    const possibleDigits = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 9);
    let usedDigits = [];
    number.split('').forEach((digit) => {
      if (usedDigits.includes(+digit)) {
        return false;
      } else {
        usedDigits.push(+digit);
      }
    });
    return true;
  }
}
const app = new App();
app.play();

module.exports = App;
