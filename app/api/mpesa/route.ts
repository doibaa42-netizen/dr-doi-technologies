import { NextRequest, NextResponse } from "next/server";

const consumerKey = process.env.MPESA_CONSUMER_KEY!;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
const shortcode = process.env.MPESA_SHORTCODE!;
const passkey = process.env.MPESA_PASSKEY!;

const callbackUrl =
  process.env.MPESA_CALLBACK_URL!;

async function getAccessToken() {
  const credentials = Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString("base64");

  const response = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unable to obtain M-PESA access token");
  }

  const data = await response.json();

  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const phone = body.phone;
    const amount = body.amount;

    if (!phone || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number and amount are required.",
        },
        { status: 400 }
      );
    }

    const token = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      `${shortcode}${passkey}${timestamp}`
    ).toString("base64");

    const response = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Number(amount),
          PartyA: phone,
          PartyB: shortcode,
          PhoneNumber: phone,
          CallBackURL: callbackUrl,
          AccountReference: "DRDOI",
          TransactionDesc: "Dr Doi Technologies Service",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "M-PESA request failed.",
          data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "M-PESA payment request sent.",
      data,
    });
  } catch (error) {
    console.error("M-PESA ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process M-PESA request.",
      },
      { status: 500 }
    );
  }
            }
