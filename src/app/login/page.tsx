import { type Metadata } from "next";

import AcmeLogo from "#/app/ui/acme-logo.tsx";
import LoginForm from "#/app/ui/login-form.tsx";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to your account",
};

export default function LoginPage(): JSX.Element {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative max-w-[400px] w-full flex flex-col space-y-2.5 p-4 md:-mt-32">
				<div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
					<div className="w-32 text-white md:w-36">
						<AcmeLogo />
					</div>
				</div>
				<LoginForm />
			</div>
		</main>
	);
}
