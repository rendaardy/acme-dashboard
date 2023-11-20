import {
	BanknotesIcon,
	ClockIcon,
	UserGroupIcon,
	InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "#/app/ui/fonts.ts";
import { fetchCardData } from "#/app/lib/data.ts";

const iconMap = {
	collected: BanknotesIcon,
	customers: UserGroupIcon,
	pending: ClockIcon,
	invoices: InboxIcon,
};

export default async function Cards(): Promise<JSX.Element> {
	const {
		numberOfCustomers,
		numberOfInvoices,
		totalPaidInvoices,
		totalPendingInvoices,
	} = await fetchCardData();

	return (
		<>
			<Card title="Collected" value={totalPaidInvoices} type="collected" />
			<Card title="Pending" value={totalPendingInvoices} type="pending" />
			<Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
			<Card
				title="Total Customers"
				value={numberOfCustomers}
				type="customers"
			/>
		</>
	);
}

export interface CardProps {
	title: string;
	value: number | string;
	type: "invoices" | "customers" | "pending" | "collected";
}

export function Card({ title, value, type }: CardProps): JSX.Element {
	const Icon = iconMap[type];

	return (
		<div className="rounded-xl bg-gray-50 p-2 shadow-sm">
			<div className="flex p-4">
				{Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
				<h3 className="ml-2 text-sm font-medium">{title}</h3>
			</div>
			<p
				className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
			>
				{value}
			</p>
		</div>
	);
}