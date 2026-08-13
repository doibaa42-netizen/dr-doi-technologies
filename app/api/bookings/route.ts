import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      location,
      service,
      requestedService,
      description,
    } = body;

    if (
      !name ||
      !phone ||
      !location ||
      !service ||
      !requestedService
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide all required booking information.",
        },
        { status: 400 }
      );
    }

    const bookingReference =
      "DRDOI-" +
      Date.now().toString().slice(-8);

    const booking = {
      bookingReference,
      name,
      phone,
      location,
      service,
      requestedService,
      description: description || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    console.log("NEW DR DOI BOOKING:", booking);

    return NextResponse.json(
      {
        success: true,
        message: "Booking received successfully.",
        booking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("BOOKING API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process booking. Please try again.",
      },
      { status: 500 }
    );
  }
      }
