import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

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
      "DRDOI-" + Date.now().toString().slice(-8);

    const { data: booking, error: databaseError } =
      await supabase
        .from("bookings")
        .insert({
          booking_reference: bookingReference,
          name,
          phone,
          location,
          service,
          requested_service: requestedService,
          description: description || "",
          status: "Pending",
        })
        .select()
        .single();

    if (databaseError) {
      console.error(
        "SUPABASE BOOKING ERROR:",
        databaseError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to save your booking. Please try again.",
        },
        { status: 500 }
      );
    }

    if (
      process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM_EMAIL &&
      process.env.BOOKING_NOTIFICATION_EMAIL
    ) {
      const { error: emailError } =
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: [
            process.env.BOOKING_NOTIFICATION_EMAIL,
          ],
          subject:
            `New Dr Doi Booking - ${bookingReference}`,
          html: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 650px;
              margin: auto;
              padding: 25px;
              background: #f5f7fa;
              color: #17202a;
            ">

              <div style="
                background: #071a2b;
                padding: 25px;
                border-radius: 12px 12px 0 0;
                text-align: center;
              ">

                <h1 style="
                  color: #00c8ff;
                  margin: 0;
                ">
                  DR DOI TECHNOLOGIES
                </h1>

                <p style="
                  color: white;
                  margin-bottom: 0;
                ">
                  New Service Booking
                </p>

              </div>

              <div style="
                background: white;
                padding: 25px;
                border-radius: 0 0 12px 12px;
              ">

                <h2>New Booking Received</h2>

                <p>
                  A customer has submitted a new
                  service booking through your website.
                </p>

                <div style="
                  background: #eaf8ff;
                  padding: 18px;
                  border-radius: 10px;
                  text-align: center;
                  margin: 20px 0;
                ">

                  <p style="
                    margin: 0 0 6px;
                    color: #555;
                  ">
                    BOOKING REFERENCE
                  </p>

                  <strong style="
                    color: #00a9df;
                    font-size: 24px;
                  ">
                    ${bookingReference}
                  </strong>

                </div>

                <h3>Customer Details</h3>

                <p>
                  <strong>Name:</strong> ${name}
                </p>

                <p>
                  <strong>Phone:</strong> ${phone}
                </p>

                <p>
                  <strong>Location:</strong> ${location}
                </p>

                <h3>Service Requested</h3>

                <p>
                  <strong>Category:</strong> ${service}
                </p>

                <p>
                  <strong>Specific Service:</strong>
                  ${requestedService}
                </p>

                <p>
                  <strong>Description:</strong>
                  ${
                    description ||
                    "No additional description provided."
                  }
                </p>

                <p>
                  <strong>Status:</strong>
                  <span style="color:#e67e22;">
                    Pending
                  </span>
                </p>

                <p>
                  <strong>Date:</strong>
                  ${new Date().toLocaleString("en-KE", {
                    timeZone: "Africa/Nairobi",
                  })}
                </p>

                <hr />

                <p style="color:#666;">
                  This booking was automatically
                  generated by the Dr Doi Technologies
                  website.
                </p>

              </div>
            </div>
          `,
        });

      if (emailError) {
        console.error(
          "BOOKING EMAIL ERROR:",
          emailError
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking received successfully.",
        booking: {
          bookingReference,
          ...booking,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(
      "BOOKING API ERROR:",
      error
    );

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
