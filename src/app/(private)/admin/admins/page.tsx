import { AdminsList } from "@/components/Admin/AdminsList";
import { ActionsBar } from "@/components/Admin/ActionsBar";

export default function AdminsPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-center font-heading">Admins Management</h1>
			
			<ActionsBar />
			<AdminsList />
		</div>
	)
}