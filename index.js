const data = require("./data2");

console.log(data);

const buongiorni = (rules, data, options) => {
  const { strict = false } = options || {};
  const parsedRules = rules
    .split("end")
    .map((elem) =>
      elem
        .split("\n")
        .map((elem) => elem.trim())
        .filter((elem) => elem.length)
    )
    .filter((elem) => elem.length)
    .map((elem) => {
      console.log(elem);
      const lineSplit = elem[0].split(" ");
      const command = lineSplit[0];

      const actions = elem.slice(1).map((action) => {
        const fragments = action.split(" ").map((frag) => frag.trim());
        const key = fragments[0];
        const val = fragments[1];
        let force = false;
        if (fragments.length > 2) {
          if (fragments[2] === "f") {
            force = true;
          }
        }
        return { key, val, force };
      });

      const actionFunction = (elem) => {
        console.log(actions);
        const newElement = { ...elem };
        actions.forEach((action) => {
          if (
            newElement.hasOwnProperty(action.key) ||
            action.force ||
            !strict
          ) {
            newElement[action.key] = action.val;
          }
        });
        console.log(newElement);
        return newElement;
      };

      // noop
      let conditionFunction = (elem) => elem;

      switch (command) {
        case "every": {
          const everyIndex = parseInt(lineSplit[1].trim());
          console.log("everyIndex", everyIndex);
          conditionFunction = (index) => {
            return (index + 1) % everyIndex === 0;
          };
          break;
        }
        case "from": {
          const minIndex = parseInt(lineSplit[1]);
          if (lineSplit.length === 2) {
            // only "from ..."
            conditionFunction = (elem) => elem >= minIndex;
          } else if (lineSplit.length === 4) {
            // probably "from ... to ..."
            const maxIndex = parseInt(lineSplit[3]);
            conditionFunction = (elem) => elem >= minIndex && elem <= maxIndex;
          }
          break;
        }
      }

      return [conditionFunction, actionFunction, elem[0]];
    });
  return data.map((element, elementIndex) => {
    console.log("---------------------");
    console.log(elementIndex, element);
    const newElem = parsedRules.reduce((currentElemState, currentRuleset) => {
      const [condition, action, conditionName] = currentRuleset;
      if (condition(elementIndex)) {
        console.log(conditionName, true);
        return action(currentElemState);
      } else {
        console.log(conditionName, false);
        return currentElemState;
      }
    }, element);
    return newElem;
  });
};

const bgRules = `
every 2
    age 20
    cool TRUE
    end
from 5
    late TRUE
    end
from 2 to 4
    middle TRUE
    end
`;

const newData = buongiorni(bgRules, data);

console.log(newData);
