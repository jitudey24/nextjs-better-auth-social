"use client";

import { changePassword } from "@/app/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChangePass = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const changPass = Object.fromEntries(formData.entries());

    console.log("Form Data:", changPass);

    const { data: resData, error } = await changePassword({
      currentPassword: changPass.currentPassword,
      newPassword: changPass.newPassword,
      revokeOtherSessions: true,
    });

    console.log("After change password:", resData, error);
  };

  return (
    <div className="flex justify-center p-10">
      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={handleChangePass}
      >
        {/* Current Password */}
        <TextField
          className="w-full max-w-[280px]"
          name="currentPassword"
          isRequired
        >
          <Label>Old Password</Label>

          <InputGroup>
            <InputGroup.Input
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                type="button"
                aria-label={
                  showCurrentPassword
                    ? "Hide password"
                    : "Show password"
                }
                size="sm"
                variant="ghost"
                onPress={() =>
                  setShowCurrentPassword(!showCurrentPassword)
                }
              >
                {showCurrentPassword ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <FieldError />
        </TextField>

        {/* New Password */}
        <TextField
          className="w-full max-w-[280px]"
          name="newPassword"
          isRequired
          validate={(value) => {
            if (!value) {
              return "Password is required";
            }

            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>New Password</Label>

          <InputGroup>
            <InputGroup.Input
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                type="button"
                aria-label={
                  showNewPassword
                    ? "Hide password"
                    : "Show password"
                }
                size="sm"
                variant="ghost"
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>

          <FieldError />
        </TextField>

        <Button type="submit">
          <Check />
          Submit
        </Button>
      </Form>
    </div>
  );
}
