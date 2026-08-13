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

    // Validate required fields
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

    // Generate booking reference
    const bookingReference =
      "DRDOI-" +
      Date.now().toString().slice(-8);

    // Booking information
    const booking = {
      bookingReference,
      name,
      phone,
      location,
      service,
      requestedService,
      description: description || "",
      createdAt: new Date().toISOString(),
      status: "Received",
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
        message: "Unable to process booking.",
      },
      { status: 500 }
    );
  }
}
