import { Suspense } from "react";
import clsx from "clsx";
import { type Metadata } from "next";

import Cards from "#/app/ui/dashboard/cards.tsx";
import RevenueChart from "#/app/ui/dashboard/revenue-chart.tsx";
import LatestInvoices from "#/app/ui/dashboard/latest-invoices.tsx";
import {
	RevenueChartSkeleton,
	LatestInvoicesSkeleton,
	CardsSkeleton,
} from "#/app/ui/skeletons.tsx";
import { lusitana } from "#/app/ui/fonts.ts";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function DashboardPage(): JSX.Element {
	return (
		<main>
			<h1 className={clsx(lusitana.className, "mb-4 text-xl md:text-2xl")}>
				Dashboard
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<CardsSkeleton />}>
					<Cards />
				</Suspense>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
				<Suspense fallback={<RevenueChartSkeleton />}>
					<RevenueChart />
				</Suspense>
				<Suspense fallback={<LatestInvoicesSkeleton />}>
					<LatestInvoices />
				</Suspense>
			</div>
		</main>
	);
}
