import { notFound } from "next/navigation";
import { type Metadata } from "next";

import Form from "#/app/ui/invoices/edit-form.tsx";
import Breadcrumbs from "#/app/ui/invoices/breadcrumbs.tsx";
import { fetchCustomers, fetchInvoiceById } from "#/app/lib/data.ts";

export const metadata: Metadata = {
	title: "Edit Invoice",
};

interface PageProps {
	params: {
		id: string;
	};
}

export default async function Page({
	params,
}: PageProps): Promise<JSX.Element> {
	const { id } = params;
	const [invoice, customers] = await Promise.all([
		fetchInvoiceById(id),
		fetchCustomers(),
	]);

	if (!invoice) {
		notFound();
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Invoices", href: "/dashboard/invoices" },
					{
						label: "Edit Invoice",
						href: `/dashboard/invoices/${id}/edit`,
						active: true,
					},
				]}
			/>
			<Form invoice={invoice} customers={customers} />
		</main>
	);
}
