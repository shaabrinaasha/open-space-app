/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */
import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import LoginInput from "./LoginInput";

expect.extend(matchers);

describe("LoginInput component", () => {
  // keep dom env clean after each test
  afterEach(() => {
    cleanup();
  });

  it("should handle username typing correctly", async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText("Username");

    // Action
    await userEvent.type(usernameInput, "usernametest");

    // Assert
    expect(usernameInput).toHaveValue("usernametest");
  });

  it("should handle password typing correctly", async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText("Password");
    // action
    await userEvent.type(passwordInput, "passwordTest");
    // assert
    expect(passwordInput).toHaveValue("passwordTest");
  });

  it("should call login function when login button is clicked", async () => {
    // arrange
    // mock fungsi login
    const mocklogin = vi.fn();
    render(<LoginInput login={mocklogin} />);
    const usernameInput = await screen.getByPlaceholderText("Username");
    await userEvent.type(usernameInput, "usernameTest");
    const passwordInput = await screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "passwordTest");
    const loginButton = await screen.getByRole("button", { name: "Login" });
    // action
    await userEvent.click(loginButton);
    // assert
    expect(mocklogin).toBeCalledWith({
      id: "usernameTest",
      password: "passwordTest",
    });
  });
});
