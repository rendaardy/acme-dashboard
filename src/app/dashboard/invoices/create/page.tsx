import { type Metadata } from "next";

import Form from "#/app/ui/invoices/create-form.tsx";
import Breadcrumbs from "#/app/ui/invoices/breadcrumbs.tsx";
import { fetchCustomers } from "#/app/lib/data.ts";

export const metadata: Metadata = {
	title: "Create Invoice",
};

export default async function Page(): Promise<JSX.Element> {
	const customers = await fetchCustomers();

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Invoices", href: "/dashboard/invoices" },
					{
						label: "Create Invoice",
						href: "/dashboard/invoices/create",
						active: true,
					},
				]}
			/>
			<Form customers={customers} />
		</main>
	);
}
