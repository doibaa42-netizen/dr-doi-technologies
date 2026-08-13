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
          message: "Please fill in all required fields.",
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
      status: "Received",
      createdAt: new Date().toISOString(),
    };

    console.log("NEW BOOKING:", booking);

    return NextResponse.json({
      success: true,
      message: "Booking received successfully.",
      booking,
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process booking.",
      },
      { status: 500 }
    );
  }
}
