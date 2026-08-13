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

    // Validate required booking information
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

    // Generate booking reference
    const bookingReference =
      "DRDOI-" + Date.now().toString().slice(-8);

    // Create booking
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

    // Log booking in Vercel
    console.log("NEW DR DOI BOOKING:", booking);

    // Return JSON response to the website
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
