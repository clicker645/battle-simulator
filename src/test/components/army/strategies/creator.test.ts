import { StrategyCreator } from "../../../../core/components/army/strategy/creator";
import { validate, validateOrReject } from "class-validator";

describe("Test Validation", () => {
  test("string not found", () => {
    const creator = new StrategyCreator("weakest");
    validate(creator).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        console.log("validation failed. errors: ", errors);
      } else {
        console.log("validation succeed");
      }
    });

    validateOrReject(creator).catch((errors) => {
      console.log("Promise rejected (validation failed). Errors: ", errors);
    });

    expect(2).toBe(3);
  });
});
