// @flow

import React from "react";
import { render, waitFor, RenderResult } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

async function hold(milliseconds: number): Promise<any> {
  return waitFor(() => {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });
  });
}

async function getRenderedResult(
  component: React$Element<any>,
  mockData: Array<Object>
): Promise<RenderResult<Object, HTMLElement>> {
  const renderResult = render(
    <MockedProvider mocks={mockData}>{component}</MockedProvider>
  );

  // wait for data to be available
  await hold(0);

  return renderResult;
}

export { getRenderedResult, hold };
