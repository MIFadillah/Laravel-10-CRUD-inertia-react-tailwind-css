import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';

export default function Dashboard(props) {
    const { users } = usePage().props;
    function handleToggleEditor(userId) {
        try {
            router.put(route("user.edit", { id: userId }));
        } catch (error) {
            console.error('Failed to toggle user role:', error);
        }
    }
    return (
        <AuthenticatedLayout auth={props.auth} user={props.auth.user} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Posts</h2>}>
            <Head title="Posts" />
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                {props.flash.success && (
                    <div className="text-center bg-gray-300 font-bold text-blue-900 p-1">
                        {props.flash.success}
                    </div>
                )}
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="text-white bg-gray-500">
                                        <th className="px-4 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.map((item) => (
                                        <tr key={item.id}>
                                            <td className="border px-4 text-center py-2">{item.id}</td>
                                            <td className="border px-4 text-center py-2">{item.name}</td>
                                            <td className="border px-4 text-center py-2">{item.email}</td>
                                            <td className="border px-4 text-center py-2">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                        className="sr-only peer"
                                                        onChange={() => handleToggleEditor(item.id)}
                                                        checked={item.roles.some(role => role.name === 'editor')}
                                                    />
                                                    <div className={`w-11 h-6 ${item.roles.some(role => role.name === 'editor') ? 'bg-blue-600' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}></div>
                                                    <span className={`ms-3 text-sm font-medium ${item.roles.some(role => role.name === 'editor') ? 'text-blue-600' : 'text-gray-900 dark:text-gray-300'}`}>Editor</span>
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td className="px-6 py-4 border-t" colSpan="4">No users found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

