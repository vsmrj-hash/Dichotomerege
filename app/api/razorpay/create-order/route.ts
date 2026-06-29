import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export const dynamic = "force-dynamic";

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { planId, amount, currency = "INR" } = await req.json();

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount,
      currency,
      notes: { planId },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Order creation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
