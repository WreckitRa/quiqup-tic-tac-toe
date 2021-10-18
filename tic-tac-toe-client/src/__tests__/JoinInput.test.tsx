import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import { JoinRoom, IJoinRoomProps } from "../components/joinRoom";

function renderJoinRoom(props: Partial<IJoinRoomProps> = {}) {
  const defaultProps: IJoinRoomProps = {
    onRoomIdChange() {
      return;
    },
    onSubmit() {
      return;
    },
  };
  return render(<JoinRoom {...defaultProps} {...props} />);
}

describe("<JoinRoom />", () => {
  test("should display a blank input field", async () => {
    const { findByTestId } = renderJoinRoom();
    const joinForm = await findByTestId("room-form");
    expect(joinForm).toHaveFormValues({
      roomName: "",
    });
  });
});

test("should allow entering a room id", async () => {
  const onRoomIdChange = jest.fn();
  const { findByTestId } = renderJoinRoom({ onRoomIdChange });
  const roomName = await findByTestId("roomName");

  fireEvent.change(roomName, { target: { value: "test" } });
});

test("should submit the form with room id", async () => {
  const onSubmit = jest.fn();
  const { findByTestId } = renderJoinRoom({
    onSubmit,
    shouldRemember: false,
  });
  const roomName = await findByTestId("roomName");
  const submit = await findByTestId("submit");

  fireEvent.change(roomName, { target: { value: "test" } });
  fireEvent.click(submit);
});
