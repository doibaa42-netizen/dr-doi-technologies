import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

    // Check required booking information
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

    // Create booking object
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

    /*
     * ----------------------------------------------------
     * SEND EMAIL NOTIFICATION
     * ----------------------------------------------------
     *
     * This sends the booking details to your email.
     *
     * Required Vercel variables:
     *
     * RESEND_API_KEY
     * RESEND_FROM_EMAIL
     * BOOKING_NOTIFICATION_EMAIL
     *
     * ----------------------------------------------------
     */

    if (
      process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM_EMAIL &&
      process.env.BOOKING_NOTIFICATION_EMAIL
    ) {
      const { error: emailError } =
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: [process.env.BOOKING_NOTIFICATION_EMAIL],
          subject: `🔔 New Dr Doi Booking - ${bookingReference}`,
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
                  font-size: 26px;
                ">
                  DR DOI TECHNOLOGIES
                </h1>

                <p style="
                  color: #ffffff;
                  margin: 8px 0 0;
                  font-size: 16px;
                ">
                  New Service Booking
                </p>

              </div>

              <div style="
                background: #ffffff;
                padding: 25px;
                border-radius: 0 0 12px 12px;
              ">

                <h2 style="
                  color: #071a2b;
                  margin-top: 0;
                ">
                  🔔 New Booking Received
                </h2>

                <p>
                  A customer has submitted a new service
                  booking through the Dr Doi Technologies website.
                </p>

                <div style="
                  background: #eaf8ff;
                  padding: 18px;
                  border-radius: 10px;
                  margin: 20px 0;
                  text-align: center;
                ">

                  <p style="
                    margin: 0 0 6px;
                    color: #555;
                    font-size: 13px;
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

                <h3 style="
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 8px;
                ">
                  Customer Details
                </h3>

                <p>
                  <strong>Full Name:</strong>
                  ${name}
                </p>

                <p>
                  <strong>Phone:</strong>
                  ${phone}
                </p>

                <p>
                  <strong>Location:</strong>
                  ${location}
                </p>

                <h3 style="
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 8px;
                  margin-top: 25px;
                ">
                  Service Requested
                </h3>

                <p>
                  <strong>Category:</strong>
                  ${service}
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
                  <span style="color: #e67e22;">
                    Pending
                  </span>
                </p>

                <p>
                  <strong>Date:</strong>
                  ${new Date().toLocaleString("en-KE", {
                    timeZone: "Africa/Nairobi",
                  })}
                </p>

                <div style="
                  margin-top: 30px;
                  padding: 18px;
                  background: #f1f8f4;
                  border-left: 5px solid #16a085;
                  border-radius: 6px;
                ">

                  <strong>
                    Customer contact:
                  </strong>

                  <p style="margin-bottom: 0;">
                    Call or WhatsApp the customer using
                    the phone number provided above.
                  </p>

                </div>

                <p style="
                  margin-top: 30px;
                  color: #777;
                  font-size: 13px;
                  text-align: center;
                ">
                  This notification was automatically
                  generated by the Dr Doi Technologies
                  booking system.
                </p>

              </div>

            </div>
          `,
        });

      if (emailError) {
        /*
         * IMPORTANT:
         * Do not reject the booking just because
         * email notification failed.
         *
         * The booking has already been accepted.
         */
        console.error(
          "BOOKING EMAIL ERROR:",
          emailError
        );
      } else {
        console.log(
          "BOOKING EMAIL SENT SUCCESSFULLY"
        );
      }
    } else {
      console.warn(
        "Email notification is not configured. " +
        "Add RESEND_API_KEY, RESEND_FROM_EMAIL, " +
        "and BOOKING_NOTIFICATION_EMAIL."
      );
    }

    /*
     * ----------------------------------------------------
     * RETURN SUCCESS TO THE WEBSITE
     * ----------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,
        message:
          "Booking received successfully.",
        booking,
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
