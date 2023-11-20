import { Suspense } from "react";
import clsx from "clsx";
import { type Metadata } from "next";

import Pagination from "#/app/ui/invoices/pagination.tsx";
import Search from "#/app/ui/search.tsx";
import Table from "#/app/ui/invoices/table.tsx";
import { CreateInvoice } from "#/app/ui/invoices/buttons.tsx";
import { InvoicesTableSkeleton } from "#/app/ui/skeletons.tsx";
import { lusitana } from "#/app/ui/fonts.ts";
import { fetchInvoicesPages } from "#/app/lib/data.ts";

export const metadata: Metadata = {
	title: "Invoices",
};

interface SearchParams {
	query?: string;
	page?: string;
}

interface InvoicesPageProps {
	searchParams: SearchParams;
}

export default async function InvoicesPage({
	searchParams,
}: InvoicesPageProps): Promise<JSX.Element> {
	const query = searchParams?.query ?? "";
	const currentPage = Number.parseInt(searchParams?.page ?? "1", 10);
	const totalPages = await fetchInvoicesPages(query);

	return (
		<div className="w-full">
			<div className="w-full flex justify-between items-center">
				<h1 className={clsx(lusitana.className, "text-2xl")}>Invoices</h1>
			</div>
			<div className="mt-4 flex justify-between items-center gap-2 md:mt-8">
				<Search placeholder="Search invoices..." />
				<CreateInvoice />
			</div>
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
				<Table query={query} currentPage={currentPage} />
			</Suspense>
			<div className="mt-5 w-full flex justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
