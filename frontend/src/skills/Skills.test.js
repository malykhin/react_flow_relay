import React from "react";
import { render, wait, act, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Skills from "./Skills";
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
describe("Skills component test", () => {
  test("renders component", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <Skills />
      </MockedProvider>
    );
    await act(() => {
      return new Promise(resolve => {
        setTimeout(resolve, 0);
      });
    });
    // renders front end title
    expect(getByText("Front End")).toBeInTheDocument();
    // renders front end list
    expect(getByText("Test 1")).toBeInTheDocument();

    // renders back end title
    expect(getByText("Back End")).toBeInTheDocument();
    // renders back end list
    expect(getByText("Test 2")).toBeInTheDocument();
  });
});
