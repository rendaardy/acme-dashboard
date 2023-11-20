"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signIn } from "#/auth.ts";

const formSchema = z.object({
	id: z.string(),
	customerId: z.string({
		invalid_type_error: "Please select a customer.",
	}),
	amount: z.coerce
		.number()
		.gt(0, { message: "Please enter an amount greater than $0." }),
	status: z.enum(["pending", "paid"], {
		invalid_type_error: "Please select an invoice status.",
	}),
	date: z.string(),
});

const createInvoiceSchema = formSchema.omit({ id: true, date: true });
const updateInvoiceSchema = formSchema.omit({ id: true, date: true });

export type State<T> = T;

export type Information = {
	errors?: {
		customerId?: Array<string>;
		amount?: Array<string>;
		status?: Array<string>;
	};
	message?: string | null;
};

export async function createInvoice(
	prevState: State<Information>,
	formData: FormData,
): Promise<Information> {
	const data = Object.fromEntries(formData);
	const validatedFields = createInvoiceSchema.safeParse(data);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing fields. Failed to create invoice",
		};
	}

	const { customerId, amount, status } = validatedFields.data;
	const amountInCents = amount * 100;
	const date = new Date().toISOString().split("T").at(0);

	try {
		await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
	} catch (error) {
		return {
			message: "Database Error: Failed to create invoice",
		};
	}

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");

	return { errors: {}, message: "Successfully created invoice" };
}

export async function updateInvoice(
	id: string,
	prevState: State<Information>,
	formData: FormData,
): Promise<Information> {
	const data = Object.fromEntries(formData);
	const validatedFields = updateInvoiceSchema.safeParse(data);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing fields. Failed to update invoice",
		};
	}

	const { customerId, amount, status } = validatedFields.data;
	const amountInCents = amount * 100;

	try {
		await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
	} catch (error) {
		return {
			message: "Database Error: Failed to update invoice",
		};
	}

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");

	return { errors: {}, message: "Successfully updated invoice" };
}

export async function deleteInvoice(id: string): Promise<Information> {
	try {
		await sql`
      DELETE FROM invoices
      WHERE id = ${id}
    `;

		revalidatePath("/dashboard/invoices");

		return { message: "Successfully deleted invoice" };
	} catch (error) {
		return {
			message: "Database Error: Failed to delete invoice",
		};
	}
}

export async function authenticate(
	prevState: State<string>,
	formData: FormData,
): Promise<string> {
	try {
		await signIn("credentials", Object.fromEntries(formData));
		return "";
	} catch (error) {
		if ((error as Error).message.includes("CredentialsSignin")) {
			return "CredentialsSignin";
		}

		throw error;
	}
}
