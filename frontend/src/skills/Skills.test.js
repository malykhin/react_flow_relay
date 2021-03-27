import { fireEvent } from "@testing-library/react";
import { getRenderedResult, hold } from "../common/testUtils";
import Skills, { ADD_SKILL_TO_AREA, reducer } from "./Skills";
import { GET_SKILLS } from "./queries";

const mocks = [
  {
    request: {
      query: GET_SKILLS
    },
    result: {
      data: {
        frontEnd: {
          __typename: "Area",
          id: "1",
          name: "Front End",
          skills: {
            edges: [{ node: { id: "1", name: "Test 1" } }]
          }
        },
        backEnd: {
          __typename: "Area",
          id: "2",
          name: "Back End",
          skills: { edges: [{ node: { id: "2", name: "Test 2" } }] }
        }
      }
    }
  }
];

const mockInitialState = {
  modalOpen: false,
  area: {},
  ...mocks[0].result.data
};
describe("Skills component test", () => {
  test("renders component", async () => {
    const { getByText } = await getRenderedResult(<Skills />, mocks);
    // renders front end title
    expect(getByText("Front End")).toBeInTheDocument();
    // renders front end list
    expect(getByText("Test 1")).toBeInTheDocument();

    // renders back end title
    expect(getByText("Back End")).toBeInTheDocument();
    // renders back end list
    expect(getByText("Test 2")).toBeInTheDocument();
  });

  test("opens/closes modal on list click", async () => {
    const { container } = await getRenderedResult(<Skills />, mocks);
    expect(document.querySelector("[role=dialog]")).toBeNull();
    const listWrapper = container.querySelector(".list-wrapper");
    fireEvent.click(listWrapper);
    const modal = document.querySelector("[role=dialog]");
    expect(modal).not.toBeNull();
    // closes modal
    const crossButton = modal.querySelector("[type=button]");
    fireEvent.click(crossButton);
    // there is transition effect on modal close
    await hold(500);
    expect(document.querySelector("[role=dialog]")).toBeNull();
  });

  test("display data reducer", () => {
    const mockPayload = {
      areaKey: "frontEnd",
      newSkill: { id: "12", name: "Test 12" }
    };
    const newState = reducer(mockInitialState, {
      type: ADD_SKILL_TO_AREA,
      payload: mockPayload
    });
    expect(newState.frontEnd.skills.edges).toHaveLength(2);
    // check immutable update
    expect(mockInitialState).not.toEqual(newState);
  });
});
