"use client";

import { useParams, useRouter } from "next/navigation";
import * as React from "react";

import Navigation from "@/app/forget/navigation";
import { LoadingSpinner } from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const validateOTP = async (otp: string) => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, otp }),
    });

    const data = await response.json();

    return data.valid;
  };

  const onSubmit = async () => {
    if (/^\d{5}$/.test(value)) {
      setLoading(true);
      const isValid = await validateOTP(value);

      setLoading(false);
      if (isValid) {
        setError("");
        router.push("/forget/reset-password");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } else {
      setError("Please enter a valid 5-digit OTP.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Navigation />
      <div className="mx-auto min-h-48 max-w-fit relative flex flex-col items-center justify-center">
        <header
          className="leading-normal text-center"
          style={{
            padding: "40px 40px 24px",
          }}
        >
          <h1 className="text-xl font-bold text-foreground">
            We sent you an OTP!
          </h1>
          <div className="text-center">
            <p className="text-base inline">
              Please check your email for the 5 digits OTP and enter it below.
            </p>
          </div>
        </header>
        <div className="relative text-center space-y-8">
          <InputOTP
            maxLength={5}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
            </InputOTPGroup>
          </InputOTP>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button
            className="border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground"
            disabled={loading}
            variant="outline"
            onClick={onSubmit}
          >
            {loading ? (
              <>
                <LoadingSpinner className="h-5 w-5" /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
